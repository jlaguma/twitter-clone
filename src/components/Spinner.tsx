import React, { FC } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

export const Spinner: FC = () => {
    const { promiseInProgress } = usePromiseTracker();
    if (promiseInProgress) {
        return (
            <div className="spinner">
                <Loader type="Grid" color="#00BFFF" height="40" width="40" />
            </div>
        );
    } else {
        return <></>;
    }
};
