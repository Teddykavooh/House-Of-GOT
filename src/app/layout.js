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
                                console.log("Brevo script loading...");
                                window.sib = {
                                    equeue: [],
                                    client_key: "25ox2qdv0zikrw32b2nr0qkf"
                                };
                                function getQueryParam(param) {
                                    var urlParams = new URLSearchParams(window.location.search);
                                    return urlParams.get(param);
                                };
                                /* OPTIONAL: email for identify request*/
                                window.sib.email_id = getQueryParam("email");
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
                                            console.log("sendinblue function called: ", k, arg);
                                        };
                                    })(j[i]);
                                }
                                var n = document.createElement("script"),
                                    i = document.getElementsByTagName("script")[0];
                                n.type = "text/javascript", n.id = "sendinblue-js", n.async = true, n.src = "https://sibautomation.com/sa.js?key=" + window.sib.client_key;
                                n.onload = function() {
                                    console.log("Brevo script loaded.");
                                    console.log("Equeue: ", window.sib.equeue);
                                    console.log("Email: ", window.sib.email_id);
                                    window.sendinblue.page();
                                    // Display a welcome message based on the presence of the email_id
                                    var email = window.sib.email_id ? window.sib.email_id : "Guest";
                                    alert("Welcome, " + email);
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
