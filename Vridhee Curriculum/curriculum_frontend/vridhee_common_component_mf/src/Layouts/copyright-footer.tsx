import React from "react";

export default function FooterCopyright() {
    const Styles = {
        copyright: {
            background: '#FFFFFF',
            border: '1px solid #0043924B',
            padding: '5px 20px',
            color: '#004392',
        },
        m0: {
            margin: 0,
        }

    }
    return (
        <div className="footer-copyright" style={{ 'position': 'fixed', 'width': '100%', 'bottom': '0', 'left':'0' }}>
            <div style={Styles.copyright}>
                <p style={Styles.m0}>© Vridhee 2023</p>
            </div>
        </div>
    );
}