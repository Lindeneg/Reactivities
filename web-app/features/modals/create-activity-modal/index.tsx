import { Formik, type FormikHelpers } from 'formik';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import communicator from '@/communicator';
import GridForm from '@/components/grid-form';
import Modal from '@/components/modal';
import api from '@/data/client';
import useListener from '@/hooks/use-listener';
import defaultFormValidation from '@/logic/default-form-validation';
import getCategory from '@/logic/get-category';
import setFieldErrorFromApi from '@/logic/set-field-error-from-api';
import type { Activity, BaseActivity, User } from '@/models';

const sharedProps = { required: true, fullWidth: true, autoFocus: true };
const defaultState = {
    title: '',
    category: 0,
    city: '',
    venue: '',
    description: '',
    date: null as any,
} as BaseActivity;

export interface CreateActivityModalProps {
    user: User;
}

const CreateActivityModal = ({ user }: CreateActivityModalProps) => {
    const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
    const [activity, setActivity] = useState<Activity | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useListener('set-create-activity-modal-state', ({ detail }) => {
        setShowCreateActivityModal(detail.open);
        if (detail.open) {
            detail.activity && setActivity(detail.activity);
        } else {
            setHasSubmitted(false);
            setShowCreateActivityModal(false);
            setActivity(null);
        }
    });

    const hasMadeChange = (values: BaseActivity) => {
        if (!activity) return true;
        for (const key in values) {
            if (values[key as keyof BaseActivity] !== activity[key as keyof BaseActivity]) return true;
        }
        return false;
    };

    const handleSubmit = async (values: BaseActivity, helpers: FormikHelpers<BaseActivity>) => {
        const { error } = await (activity
            ? api.activities.update(activity.id, values)
            : api.activities.create(values, user));

        const didSetError = setFieldErrorFromApi(error, values, helpers.setFieldError);

        if (!didSetError) handleClose();
    };

    const handleClose = () => communicator.publish('set-create-activity-modal-state', { open: false });

    return (
        <Modal
            open={showCreateActivityModal}
            onClose={activity ? handleClose : () => null}
            labelledBy='activity modal'
            describedBy='create a new activity'
        >
            <Typography id='activity-modal-title' variant='h6' component='h2'>
                {activity ? 'Edit' : 'Create'} Activity
            </Typography>
            <Divider sx={{ margin: '15px 0px' }} />
            <Formik<BaseActivity>
                initialValues={activity || defaultState}
                validate={(values) =>
                    defaultFormValidation(values, {
                        exclude: ['category', 'hostUsername', 'attendees', 'hostUsername', 'isCancelled'],
                    })
                }
                onSubmit={handleSubmit}
            >
                {({
                    values,

                    errors,

                    isSubmitting,

                    handleChange,

                    setFieldValue,

                    handleBlur,

                    handleSubmit,
                }) => (
                    <GridForm
                        small={[
                            {
                                name: 'title',
                                id: 'title',
                                label: 'Title',
                                value: values.title,
                                helperText: hasSubmitted && errors.title,
                                error: hasSubmitted && !!errors.title,
                                ...sharedProps,
                            },
                            {
                                name: 'city',
                                id: 'city',
                                label: 'City',
                                value: values.city,
                                helperText: hasSubmitted && errors.city,
                                error: hasSubmitted && !!errors.city,
                                ...sharedProps,
                            },
                            {
                                name: 'category',
                                id: 'category',
                                label: 'Category',
                                options: getCategory.selection(),
                                value: values.category,
                                helperText: hasSubmitted && errors.category,
                                error: hasSubmitted && !!errors.category,
                                select: true,
                                ...sharedProps,
                            },
                            {
                                name: 'venue',
                                id: 'venue',
                                label: 'Venue',
                                value: values.venue,
                                helperText: hasSubmitted && errors.venue,
                                error: hasSubmitted && !!errors.venue,
                                ...sharedProps,
                            },
                        ]}
                        large={[
                            {
                                name: 'description',
                                id: 'description',
                                label: 'Description',
                                value: values.description,
                                helperText: hasSubmitted && errors.description,
                                error: hasSubmitted && !!errors.description,
                                maxRows: 2,
                                multiline: true,
                                ...sharedProps,
                            },
                            {
                                name: 'date',
                                id: 'date',
                                type: 'date',
                                value: values.date,
                                helperText: hasSubmitted && (errors.date as string),
                                error: hasSubmitted && !!errors.date,
                                ...sharedProps,
                            },
                        ]}
                        disabledSubmit={!!activity && !hasMadeChange(values)}
                        isSubmitting={isSubmitting}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        onClose={handleClose}
                        onSubmit={() => {
                            !hasSubmitted && setHasSubmitted(true);
                            handleSubmit();
                        }}
                    />
                )}
            </Formik>
        </Modal>
    );
};

export default CreateActivityModal;
