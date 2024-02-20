import React, { useEffect } from 'react';

export default function TestNewwindow() {
    useEffect(() => {
        // Listen for messages from the parent window
        console.log('window.location.origin1 >>>>', MessageEvent);
        const receiveMessage = (event: MessageEvent) => {
            alert("in receivemsg<<>>")
            // Verify that the message is coming from an expected origin
            if (event.origin === window.location.origin) {
                console.log('window.location.origin >>>>', window.location.origin);
                console.log('Received message in child window:', event.data);
                // Process the received data as needed
            }
        };

        // Attach the event listener
        window.addEventListener('message', receiveMessage, false);
        console.log('After adding event listener');
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('message', receiveMessage);
        };
    }, []);

    return (
        <div>
            <p>Content of the child window</p>
        </div>
    );
}