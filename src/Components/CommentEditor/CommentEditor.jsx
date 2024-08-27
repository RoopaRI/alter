import React, { useEffect, useRef } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import './CommentEditor.css';

const CommentEditor = ({ onSubmit }) => {
    const { quill, quillRef } = useQuill({
        modules: {
            toolbar: {
                container: [
                    [{ 'bold': true }, { 'italic': true }, { 'underline': true }],
                    ['image'], // Image button
                    ['customSend'] // Placeholder for custom button
                ]
            }
        },
        placeholder: 'Write a comment...'
    });

    const customButtonRef = useRef(null);

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
                    const img = new Image();
                    img.src = reader.result;
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const maxWidth = 150;
                        const scaleSize = maxWidth / img.width;
                        canvas.width = maxWidth;
                        canvas.height = img.height * scaleSize;
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        const thumbnail = canvas.toDataURL('image/png');
                        const range = quill.getSelection();
                        if (range) {
                            quill.insertEmbed(range.index, 'image', thumbnail);
                        }
                    };
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    useEffect(() => {
        if (quill) {
            const toolbar = quill.getModule('toolbar');

            if (customButtonRef.current) {
                toolbar.container.removeChild(customButtonRef.current);
            }

            const customButton = document.createElement('button');
            customButton.innerHTML = 'Send';
            customButton.className = 'ql-custom-send';
            customButton.onclick = () => onSubmit(quill); // Pass quill instance to onSubmit
            toolbar.container.appendChild(customButton);
            customButtonRef.current = customButton;

            toolbar.addHandler('image', handleImageUpload);
        }
    }, [quill, onSubmit]);

    return (
        <div className="comment-box">
            <div ref={quillRef} />
        </div>
    );
};

export default CommentEditor;
