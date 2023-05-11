import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./../index.css"



export default function Wallpapers() {
    const [wallpapers, setWallpapers] = useState([]);


    async function getWallpapers() {
        try {
            const response = await fetch(`http://localhost:5000/wall`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    credentials: true,
                },
                credentials: 'include', // Don't forget to specify this if you need cookies
            });
            if (response.ok) {
                const data = await response.json();
                setWallpapers(data.wallPapers);
            } else {
                const errorResponse = await response.json();
                console.log('Error getting wallpapers from the server:', errorResponse?.message || 'unknown error');
            }
        } catch (error) {
            console.log('Error getting wallpapers:', error.message);
        }
    }

    useEffect(() => {
        getWallpapers();
    }, []);





    return (
        <div className='header-container'>
            <Link to="/">
                <button type='button' className='btn mt-1 mx-1 btn-light fw-bold'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                        <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z" />
                    </svg>
                </button>
            </Link>

            <h2 className='text-center'>wallpapers</h2>


            <div id="carouselExampleControls" className="carousel slide m-5 p-5" data-bs-ride="carousel" data-bs-interval="3000"  >
                <div className="carousel-inner">
                    {wallpapers.map((wallpaper, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={wallpaper._id}>
                            <img className="d-block w-100 " src={`http://localhost:5000/uploads/${wallpaper.filename}`} alt={wallpaper.filename} style={{ objectFit: 'cover', height: '400px', width: "100%" }} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    );
}
