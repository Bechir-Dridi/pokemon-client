import React, { useState } from 'react';
import '../index.css';

export default function Register() {

    const [passwordMatch, setPasswordMatch] = useState(false);
    const [submissionError, setSubmissionError] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState('');

    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputPasswordVerify, setInputPasswordVerify] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        if (inputPassword !== inputPasswordVerify) {
            setPasswordMatch(true);
            return;
        }

        try {
            // const response = await fetch('http://localhost:5000/auth', {
            const response = await fetch('https://pokemon-server-vtr5.onrender.com/auth', {
                method: 'POST',
                body: JSON.stringify({
                    email: inputEmail,
                    password: inputPassword,
                    passwordVerify: inputPasswordVerify,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                //alert('Form submitted successfully.');
                console.log('Form submitted successfully.');
                setInputEmail('');
                setInputPassword('');
                setInputPasswordVerify('');
                setSubmissionSuccess('your account registration was successful!');
            } else {
                const errorResponse = await response.json();
                console.log('error from the server:', errorResponse.message);
                //setSubmissionError(errorResponse.message);
            }
            setPasswordMatch(false);
            setSubmissionError('');
        } catch (error) {
            console.log('Error submitting form:', error);
            setSubmissionError('Form submission failed');
            //alert('Form submission failed');
        }
    }





    return (
        <div class="col-6 col-lg-4">
            <section id="topics">
                <div className="row mb-5 g-5 justify-content-around align-items-center">

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="theModal" aria-hidden="true">
                        <div className="modal-dialog">
                            <form className="bg-dark modal-content" onSubmit={submit}>
                                <div className="modal-header">
                                    <h1>Sign up</h1>
                                    <button type="button" className="btn-close btn-outline-light" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div class="m-3">
                                    <input type="email" class="form-control" placeholder="name@example.com" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                                </div>
                                <div class="m-3">
                                    <input type="password" class="form-control" placeholder="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                                </div>
                                <div class="m-3">
                                    <input type="password" class="form-control" placeholder="retype your password" value={inputPasswordVerify} onChange={(e) => setInputPasswordVerify(e.target.value)} />
                                </div>
                                {passwordMatch && <p className='mx-3 text-danger text-end'>Passwords do not match</p>}
                                {submissionError && <p className='mx-3 text-danger text-end'>{submissionError}</p>}
                                {submissionSuccess && <p className='mx-3 text-success text-center'>{submissionSuccess}</p>}

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </section >
        </div >
    );
}
