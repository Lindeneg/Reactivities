import { Formik } from 'formik';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import communicator from '@/communicator';
import GridForm from '@/components/grid-form';
import Modal from '@/components/modal';
import api from '@/data/client';
import useListener from '@/hooks/use-listener';
import capitalizeString from '@/logic/capitalize-string';
import getCategory from '@/logic/get-category';
import type { Activity, BaseActivity } from '@/models/activity';

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

    const handleClose = () => communicator.publish('set-create-activity-modal-state', { open: false });

    // TODO refactor / split out component
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
                initialValues={
                    activity
                        ? activity
                        : { title: '', category: '' as any, city: '', venue: '', description: '', date: null as any }
                }
                validate={(values) =>
                    Object.keys(values).reduce((acc, key) => {
                        const val = values[key as keyof typeof values];
                        if (key !== 'category' && !val) {
                            acc[key] = `${capitalizeString(key)} is required`;
                        }
                        return acc;
                    }, {} as Record<string, string>)
                }
                onSubmit={async (values, helpers) => {
                    const { error } = await (activity
                        ? api.activities.update(activity.id, values)
                        : api.activities.create(values));

                    if (error) {
                        const errors = error.response?.data.errors || {};
                        Object.keys(errors).forEach((key) => {
                            const msg = errors[key as keyof typeof errors][0];
                            msg && helpers.setFieldError(key.toLowerCase(), msg);
                        });
                        return;
                    }

                    handleClose();
                }}
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
                                options: getCategory.selection(),
                                value: values.category,
                                helperText: hasSubmitted && errors.category,
                                error: hasSubmitted && !!errors.category,
                                select: true,
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
                                label: 'Description',
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
                                value: values.date,
                                helperText: hasSubmitted && (errors.date as string),
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
                        setFieldValue={setFieldValue}
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
