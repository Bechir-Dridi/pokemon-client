import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';
//import Login componounts:
import Register from './Register';
import Login from './Login';

export default function Header({ pokemonNames }) {

    const [suggestions, setSuggestions] = useState([]);

    // const suggestionsList = [
    //     'Pikachu',
    //     'charmander',
    //     'charmeleon',
    //     'charizard',
    //     'Bulbasaur',
    //     'squirtle',
    //     'Mewtwo'
    // ];

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        // setMyPokemonName(inputValue);

        const filteredSuggestions = pokemonNames.filter((suggestion) => {
            return suggestion.toLowerCase().startsWith(inputValue.toLowerCase());
        });

        if (inputValue.toLowerCase() !== "") {
            setSuggestions(filteredSuggestions);
            // setMyPokemonName(filteredSuggestions[0]);
        }
        if (inputValue.toLowerCase() === "") {
            setSuggestions([]);
        }
        console.log("dddd", suggestions)
    };

    //------------------------ Login-Logout ------------------------
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const logout = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Don't forget to specify this if you need cookies
            });

            if (response.ok) {
                //alert('you are logged out.');
                console.log('you are logged out successfully.');

                setSubmissionSuccess(false);
            } else {
                const errorResponse = await response.json();
                console.log('error logout from the server:', errorResponse.message);
                //setSubmissionError(errorResponse.message);
            }
        } catch (error) {
            console.log('Error logout submitting form:', error);
            alert(' logging out failed');
        }
    }

    //------------ Login Roles ------------------
    const [userData, setUserData] = useState({});


    // ---------------------------- post wallpaper -------------------------

    // Define state variables for the image file and upload status
    const [imageFile, setImageFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    // Handle file selection
    const handleFileSelect = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Create form data object to send to the server
        const formData = new FormData();
        formData.append('img', imageFile);

        try {
            // Send POST request to server with form data
            const response = await axios.post('http://localhost:5000/wall', formData, {
                withCredentials: true // Don't forget to specify this if you need cookies
            });

            // Update upload status
            setUploadStatus(`Image uploaded successfully`);
            //setUploadStatus(`Image uploaded successfully: ${response.data.wallPaper.filename}`);
        } catch (error) {
            // Handle error
            console.log(error);
            setUploadStatus('Error uploading image');
        }
    };


    return (
        <div className='header-container'>
            <div className="d-flex justify-content-between">
                {(userData.role === "admin" && submissionSuccess) &&
                    <div>
                        <form onSubmit={handleFormSubmit}>
                            <input type="file" accept="image/*" onChange={handleFileSelect} />
                            <button type="submit" className="btn mt-1 btn-success fw-bold">add wallpaper</button>
                        </form>
                        {uploadStatus && <p>{uploadStatus}</p>}
                    </div>}

                <div >
                    {(userData.role === "admin" && submissionSuccess) || (userData.role === "user" && submissionSuccess) ? (
                        <Link to="/wallpapers">
                            <button type='button' class="btn mt-1 mx-1 btn-light fw-bold">wallpapers</button>
                        </Link>
                    ) : (
                        <button type='button' className="btn mt-1 mx-1 btn-secondary fw-bold disabled">wallpapers</button>
                    )}

                    {!submissionSuccess &&
                        <button type="button"
                            className="btn mt-1 mx-1 btn-primary fw-bold"
                            data-bs-toggle="modal"
                            data-bs-target="#theLoginModal"
                        >
                            login
                        </button>}
                    {submissionSuccess && <button type="submit" onClick={logout} className="btn mt-1 mx-1 btn-success fw-bold">logout</button>}


                    <button type="button"
                        className="btn mt-1 mx-1 btn-primary fw-bold"
                        data-bs-toggle="modal"
                        data-bs-target="#theModal"
                    >
                        sign up
                    </button>
                </div>
            </div>


            <div class="col-6 col-lg-4">
                <section id="topics">
                    <div className="row mb-5 g-5 justify-content-around align-items-center">

                        {/* <!-- Modal --> */}
                        <Register />
                        <Login
                            userData={userData} setUserData={setUserData}
                            setSubmissionSuccess={setSubmissionSuccess} submissionSuccess={submissionSuccess} />
                    </div>
                </section >
            </div >

            <div className="text-center">
                <h1>My Pokemon</h1>
            </div>

            <div className='text-center'>
                <input type='text' placeholder='Enter a Pokemon name' onChange={handleInputChange} />
            </div>
            <div className="d-flex justify-content-center position-absolute w-100" style={{ zIndex: 1000 }}>
                <ul className="list-group">
                    <div className='bg-light rounded-bottom'>
                        {suggestions.map((suggestion, index) => (
                            <Link className="text-dark text-decoration-none" to={`/${suggestion}`}>
                                <li className="list-group-item fw-bold link" key={index}>
                                    {suggestion}
                                </li>
                            </Link>
                        ))}
                    </div>
                </ul>
            </div>

        </div >
    );
}
