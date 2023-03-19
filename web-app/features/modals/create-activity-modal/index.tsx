import { Formik } from 'formik';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import GridForm from '@/components/grid-form';
import Modal from '@/components/modal';
import api from '@/data/api';
import type { Activity, BaseActivity } from '@/models/activity';
import communicator from '@/utils/communicator';
import useSubscription from '@/utils/use-subscription';

const CreateActivityModal = () => {
    const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
    const [activity, setActivity] = useState<Activity | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const hasMadeChange = (values: BaseActivity) => {
        if (!activity) return true;
        for (const key in values) {
            if (values[key as keyof BaseActivity] !== activity[key as keyof BaseActivity]) return true;
        }
        return false;
    };

    useSubscription('set-create-activity-modal-state', ({ detail }) => {
        setShowCreateActivityModal(detail.open);
        if (detail.open) {
            detail.activity && setActivity(detail.activity);
        } else {
            setHasSubmitted(false);
            setShowCreateActivityModal(false);
            setActivity(null);
        }
    });

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
                initialValues={{
                    title: activity?.title || '',
                    category: activity?.category || ('' as any),
                    city: activity?.city || '',
                    venue: activity?.venue || '',
                    description: activity?.description || '',
                    date: activity?.date || '',
                }}
                validate={(values) => {
                    const errors: Record<string, string> = {};

                    if (!values.title || values.title.length < 3 || values.title.length > 24) {
                        errors.title = '3-24 characters';
                    }

                    if (!values.category || values.category.length < 3 || values.category.length > 32) {
                        errors.category = '3-12 characters';
                    }

                    if (!values.city || values.city.length < 1 || values.city.length > 32) {
                        errors.city = '1-16 characters';
                    }

                    if (!values.venue || values.venue.length < 1 || values.venue.length > 32) {
                        errors.venue = '1-16 characters';
                    }

                    if (!values.description || values.description.length < 3 || values.description.length > 128) {
                        errors.description = '3-128 characters';
                    }

                    if (!values.date) {
                        errors.date = 'Date is required';
                    }

                    return errors;
                }}
                onSubmit={async (values) => {
                    await (activity ? api.activities.update(activity.id, values) : api.activities.create(values));
                    handleClose();
                }}
            >
                {({
                    values,

                    errors,

                    isSubmitting,

                    handleChange,

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
                                required: true,
                                fullWidth: true,
                                autoFocus: true,
                            },
                            {
                                name: 'city',
                                id: 'city',
                                label: 'City',
                                value: values.city,
                                helperText: hasSubmitted && errors.city,
                                error: hasSubmitted && !!errors.city,
                                required: true,
                                fullWidth: true,
                                autoFocus: true,
                            },
                            {
                                name: 'category',
                                id: 'category',
                                label: 'Category',
                                value: values.category,
                                helperText: hasSubmitted && errors.category,
                                error: hasSubmitted && !!errors.category,
                                required: true,
                                fullWidth: true,
                                autoFocus: true,
                            },
                            {
                                name: 'venue',
                                id: 'venue',
                                label: 'Venue',
                                value: values.venue,
                                helperText: hasSubmitted && errors.venue,
                                error: hasSubmitted && !!errors.venue,
                                required: true,
                                fullWidth: true,
                                autoFocus: true,
                            },
                        ]}
                        large={[
                            {
                                name: 'description',
                                id: 'description',
                                label: 'Venue',
                                value: values.description,
                                helperText: hasSubmitted && errors.description,
                                error: hasSubmitted && !!errors.description,
                                maxRows: 2,
                                multiline: true,
                                required: true,
                                fullWidth: true,
                                autoFocus: true,
                            },
                            {
                                name: 'date',
                                id: 'date',
                                type: 'date',
                                value: values.date.split('T')[0],
                                helperText: hasSubmitted && errors.date,
                                error: hasSubmitted && !!errors.date,
                                required: true,
                                fullWidth: true,
                                autoFocus: true,
                            },
                        ]}
                        disabledSubmit={!!activity && !hasMadeChange(values)}
                        isSubmitting={isSubmitting}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        onClose={handleClose}
                        onSubmit={() => {
                            !hasSubmitted && setHasSubmitted(true);
                            if (Object.keys(errors).length > 0) return;
                            handleSubmit();
                        }}
                    />
                )}
            </Formik>
        </Modal>
    );
};

export default CreateActivityModal;
