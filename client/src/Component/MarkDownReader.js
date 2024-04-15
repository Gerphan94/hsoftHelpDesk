import React, { useState, useEffect } from 'react';
import { remark } from 'remark';
import remarkReact from 'remark-react';

const MarkdownReader = ({ filePath }) => {

    console.log(filePath);


    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        // Function to fetch and read Markdown file
        const fetchMarkdownFile = async () => {
            try {
                const response = await fetch(filePath);
                const markdownText = await response.text();
                console.log(markdownText);
                setMarkdownContent(markdownText);
            } catch (error) {
                console.error('Error fetching Markdown file:', error);
            }
        };

        fetchMarkdownFile();
    }, [filePath]);

    return (
        <div>
            {/* Pass createElement function to remarkReact */}
            {remark().use(remarkReact, {
                // Ensure to pass createElement function
                createElement: React.createElement
            }).processSync(markdownContent).result}
        </div>
    );
};

export default MarkdownReader;