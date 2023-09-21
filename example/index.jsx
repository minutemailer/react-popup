import React, {useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import Popup from '../src';
import '../style.css';

const root = createRoot(document.querySelector('#root'));

function App() {
    useEffect(() => {
        Popup.create({
            title: 'Hello World!',
            onShow: (id, title) => {
                console.log('Callback: onShow', id, title);
            },
            onClose: (id, title) => {
                console.log('Callback: onClose', id, title);
            },
            content: (
                <div>
                    It takes more than just a good looking body. You've got to have the heart and soul to go with it.
                </div>
            ),
            className: 'alert',
            buttons: {
                left: ['cancel'],
                right: [
                    <span style={{padding: '0 15px'}}>🦄</span>,
                    {
                        text: 'Ok!',
                        className: 'success',
                        action: Popup.close
                    }
                ]
            },
        });
    }, []);

    return <Popup />;
}

root.render(<App />);
