import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import './CommentBox.css';
import 'quill/dist/quill.snow.css';

export default function CommentBox() {

    const handleSubmit = () => {
        console.log("Comment:", comment);

        if (quill) {
            quill.setText('');
        }
        setComment('');
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'bold': true }, { 'italic': true }, { 'underline': true }], ['link'], ['send']  // Customizing Quill toolbar
            ],
            handlers: {
                'send': handleSubmit
            }
        }
    };

    const { quill, quillRef } = useQuill({ modules });
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setComment(quill.root.innerHTML);
            });
        }
    }, [quill]);


    return (
        <div className='comment-section'>
            <div className="comment-box">
                <div ref={quillRef} />
            </div>
        </div>
    );
}
