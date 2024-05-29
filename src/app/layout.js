"use client";
import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                console.log('Brevo script loading...');
                                window.sib = {
                                    equeue: [],
                                    client_key: "25ox2qdv0zikrw32b2nr0qkf"
                                };
                                /* OPTIONAL: email for identify request*/
                                // window.sib.email_id = 'example@domain.com';
                                window.sendinblue = {};
                                for (var j = ['track', 'identify', 'trackLink', 'page'], i = 0; i < j.length; i++) {
                                    (function(k) {
                                        window.sendinblue[k] = function() {
                                            var arg = Array.prototype.slice.call(arguments);
                                            (window.sib[k] || function() {
                                                var t = {};
                                                t[k] = arg;
                                                window.sib.equeue.push(t);
                                            })(arg[0], arg[1], arg[2], arg[3]);
                                            console.log('sendinblue function called:', k, arg);
                                        };
                                    })(j[i]);
                                }
                                var n = document.createElement("script"),
                                    i = document.getElementsByTagName("script")[0];
                                n.type = "text/javascript", n.id = "sendinblue-js", n.async = true, n.src = "https://sibautomation.com/sa.js?key=" + window.sib.client_key;
                                n.onload = function() {
                                    console.log('Brevo script loaded.');
                                    window.sendinblue.page();
                                };
                                i.parentNode.insertBefore(n, i);
                            })();
                        `,
                    }}
                />
            </head>
            <body>
                <AuthContextProvider>{children}</AuthContextProvider>
            </body>
        </html>
    );
}
