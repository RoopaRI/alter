import React, { useState, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import './CommentBox.css';
import 'quill/dist/quill.snow.css';

export default function CommentBox() {
    const [comment, setComment] = useState('');
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: {
                container: [
                    [{ 'bold': true }, { 'italic': true }, { 'underline': true }],
                    ['image'], // Added image button to toolbar
                    ['send']  //Added send button
                ]
            }
        },
        placeholder: 'Write a comment...'
    });

    const handleSubmit = () => {
        console.log("Comment:", comment);

        if (quill) {
            quill.setText('');
        }
        setComment('');
    };

    const handleImageUpload = () => {
        if (!quill) return;

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const range = quill.getSelection();
                    if (range) { 
                        quill.insertEmbed(range.index, 'image', reader.result);
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    useEffect(() => {
        if (quill) {
            quill.getModule('toolbar').addHandler('image', handleImageUpload);
            quill.getModule('toolbar').addHandler('send', handleSubmit);

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
