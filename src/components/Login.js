import React, { useState, useEffect } from 'react';
import '../index.css';


export default function Login({ setSubmissionSuccess, submissionSuccess, userData, setUserData }) {

    const [submissionError, setSubmissionError] = useState('');

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");


    // const [userData, setUserData] = useState({});

    async function getUserData() {
        try {
            // const response = await fetch(`http://localhost:5000/auth/user/${inputEmail}`, {
            const response = await fetch(`/auth/user/${inputEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('success getting role:', response);
                const data = await response.json();
                setUserData(data.theUser);
            } else {
                const errorResponse = await response.json();
                console.log('error logout from the server:', errorResponse.message);
            }
        } catch (error) {
            console.log('Error logout submitting form:', error.message);
        }
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            // const response = await fetch('http://localhost:5000/auth/login', {
            const response = await fetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: inputEmail,
                    password: inputPassword,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Don't forget to specify this if you need cookies
            });

            if (response.ok) {
                //alert('Form submitted successfully.');
                console.log('Form submitted successfully.');

                // set the token in a cookie
                const data = await response.json();
                console.log(data);
                // document.cookie = `accessToken=${data.accessToken}`;

                getUserData();
                setSubmissionSuccess(true);
                setInputEmail('');
                setInputPassword('');
            } else {
                const errorResponse = await response.json();
                console.log('error from the server:', errorResponse.message);
            }
            setSubmissionError('');
        } catch (error) {
            console.log('Error submitting form:', error);
            setSubmissionError('submission failed');
            //alert('Form submission failed');
        }
    }

    useEffect(() => {
        console.log("userData updated:", userData);
    }, [userData]);

    return (
        <div class="col-6 col-lg-4">
            <section id="topics">
                <div className="row mb-5 g-5 justify-content-around align-items-center">

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="theLoginModal" aria-hidden="true">
                        <div className="modal-dialog">
                            <form className="bg-dark modal-content" onSubmit={submit}>
                                <div className="modal-header">
                                    <h1>Login</h1>
                                    <button type="button" className="btn-close btn-outline-light" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div class="m-3">
                                    <input type="email" class="form-control" placeholder="name@example.com" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                                </div>
                                <div class="m-3">
                                    <input type="password" class="form-control" placeholder="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                                </div>

                                {submissionError && <p className='mx-3 text-danger text-end'>{submissionError}</p>}
                                {submissionSuccess && <p className='mx-3 text-success text-center'>you are successfully logged in!</p>}

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">login</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </section >
        </div >
    );
}
