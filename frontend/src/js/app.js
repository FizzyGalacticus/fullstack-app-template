'use strict';

import React, { useState, useCallback } from 'react';

import api from './util/api';

const handleReq = (path, options, setValue, setClass) =>
    api
        .request('', options)
        .then(r => {
            setValue(r);
            setClass('text-green-500');
        })
        .catch(e => {
            setClass('text-red-500');
            setValue(e.message);
        });

const App = () => {
    const [getText, setGetText] = useState('');
    const [getClass, setGetClass] = useState('');
    const [postText, setPostText] = useState('');
    const [postClass, setPostClass] = useState('');

    const sendGetReq = useCallback(() => handleReq('', {}, setGetText, setGetClass), [setGetText, setGetClass]);

    const sendPostReq = useCallback(
        () =>
            handleReq(
                '',
                { method: 'POST', payload: { message: 'this is a test payload' } },
                setPostText,
                setPostClass
            ),
        [setPostText, setPostClass]
    );

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-2">
                <div>Message from the Frontend: Hello from the frontend!</div>
                <div>
                    GET request result: <span className={getClass}>{getText}</span>
                </div>
                <div>
                    POST request result: <span className={postClass}>{postText}</span>
                </div>
                <div className="grid grid-cols-8 gap-3">
                    <button className="rounded text-white bg-blue-500" onClick={sendGetReq}>
                        Test API GET
                    </button>
                    <button className="rounded text-white bg-blue-500" onClick={sendPostReq}>
                        Test API POST
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;
