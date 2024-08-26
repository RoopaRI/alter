import React, { useEffect, useRef } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import './CommentEditor.css'; // Create and use this CSS file for styling if needed

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
    const customButtonRef = useRef(null); // Ref to track the custom button

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
            const toolbar = quill.getModule('toolbar');

            // Clean up any existing custom buttons
            if (customButtonRef.current) {
                toolbar.container.removeChild(customButtonRef.current);
            }

            // Add custom send button with className
            const customButton = document.createElement('button');
            customButton.innerHTML = 'Send';
            customButton.className = 'ql-custom-send'; // Apply custom styles
            customButton.onclick = onSubmit;
            toolbar.container.appendChild(customButton);
            customButtonRef.current = customButton; // Update ref

            // Add image upload handler
            toolbar.addHandler('image', handleImageUpload);

            console.log("Quill initialized with toolbar handlers");
        }
    }, [quill, onSubmit]);

    return (
        <div className="comment-box">
            <div ref={quillRef} />
        </div>
    );
};

export default CommentEditor;
