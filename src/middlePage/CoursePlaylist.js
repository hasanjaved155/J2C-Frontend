import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = '441819453061-r02t424buu3pns7dp8lbqgq34p61vo8k.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCK3lwlm_4XX4J4iwTkDEBgQBclwENM7Xs';

const CoursePlaylist = ({ path, folderId, setSelectedVideo }) => {
    const [selectedOption, setSelectedOption] = useState('Beginner');
    const [beginnerVideos, setBeginnerVideos] = useState([]);
    const [intermediateVideos, setIntermediateVideos] = useState([]);
    const [advancedVideos, setAdvancedVideos] = useState([]);
    const [error, setError] = useState(null);
    const [color, setColor] = useState("bg-gradient-to-r from-green-400 to-green-300");
    const navigate = useNavigate();

    useEffect(() => {
        const loadClient = async () => {
            try {
                await window?.gapi?.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                });

                const res = await window?.gapi?.client.request({
                    path: `https://www.googleapis.com/drive/v3/files`,
                    params: {
                        q: `'${folderId}' in parents and mimeType='video/mp4'`,
                        fields: 'files(id, name, videoMediaMetadata(durationMillis))',
                        key: API_KEY,
                    },
                });

                const fetchedVideos = res?.result?.files?.reverse();
                // console.log(fetchedVideos)

                if (fetchedVideos?.length > 0) {
                    const totalVideos = fetchedVideos?.length;

                    const third = Math.ceil(totalVideos / 3);

                    setBeginnerVideos(fetchedVideos?.slice(0, third));
                    setIntermediateVideos(fetchedVideos?.slice(third, third * 2));
                    setAdvancedVideos(fetchedVideos?.slice(third * 2));
                } else {
                    console.log('No videos found in the specified folder.');
                }
            } catch (error) {
                console.error('Error initializing Google API client:', error);
                setError('Failed to load videos. Please try again later.');
            }
        };

        window?.gapi?.load('client', loadClient);
    }, [folderId]);

    const handleClick = (option) => {
        setSelectedOption(option);
    };
    const handleColor = (clr) => {
        setColor(clr);
    }

    const formatDuration = (millis) => {
        const totalSeconds = Math.floor(millis / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours ? `${hours}:` : ''}${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const renderContent = () => {
        const videoCardClass = 'p-4 border-b-2 rounded-t-lg border-blue-300 hover:bg-slate-100 cursor-pointer';
        const videoNameClass = 'text-lg font-semibold text-gray-800';
        const handleVideoSelect = (video) => {
            setSelectedVideo(video);
            navigate(path);
        };

        const renderVideos = (videos) =>
            videos.length > 0 ? (
                videos.map((video) => (
                    <div key={video?.id} className={videoCardClass} onClick={() => handleVideoSelect(video)}>
                        <div className={videoNameClass}>
                            {video?.name}
                            <span className="text-sm text-gray-600 ml-2">
                                ({formatDuration(video?.videoMediaMetadata?.durationMillis)})
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center text-gray-600 mt-4">No videos available.</div>
            );

        switch (selectedOption) {
            case 'Beginner':
                return renderVideos(beginnerVideos);
            case 'Intermediate':
                return renderVideos(intermediateVideos);
            case 'Advanced':
                return renderVideos(advancedVideos);
            default:
                return '';
        }
    };

    return (
        <div className={`rounded-xl  mt-3 shadow-xl ${color}`}>
            <div className="flex h-96">
                <div className="text-center rounded-xl text-2xl w-1/3">
                    <div
                        className="h-1/3 rounded-tl-lg rounded-br-lg flex justify-center items-center font-extrabold text-white bg-gradient-to-r from-teal-500 to-green-400  cursor-pointer"
                        onClick={() => {
                            handleClick('Beginner')
                            handleColor('bg-gradient-to-r from-green-400 to-green-300');
                        }
                        }
                    >
                        Beginner
                    </div>
                    <div
                        className="h-1/3 rounded-r-lg flex justify-center items-center font-extrabold text-white bg-gradient-to-r from-yellow-400 to-amber-300 cursor-pointer"
                        onClick={() => {
                            handleClick('Intermediate')
                            handleColor('bg-gradient-to-r from-amber-300 to-yellow-300');
                        }
                        }
                    >
                        Intermediate
                    </div>
                    <div
                        className="h-1/3 rounded-bl-lg rounded-tr-lg flex justify-center items-center font-extrabold text-white bg-gradient-to-r from-red-500 to-orange-500 cursor-pointer"
                        onClick={() => {
                            handleClick('Advanced')
                            handleColor('bg-gradient-to-r from-orange-500 to-orange-400');
                        }
                        }
                    >
                        Advanced
                    </div>
                </div>
                <div className="w-2/3">
                    <div className={`p-6 h-full rounded-r-lg ${color}`}>
                        <div className="bg-white overflow-x-auto overflow-scroll h-full rounded-lg text-center text-2xl">{error ? <div>{error}</div> : renderContent()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlaylist;
