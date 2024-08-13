import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../Contexts/CourseContext';

const CLIENT_ID = '441819453061-r02t424buu3pns7dp8lbqgq34p61vo8k.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCK3lwlm_4XX4J4iwTkDEBgQBclwENM7Xs';

const CoursePlaylist = ({ path, folderId }) => {
    const { setSelectedVideo } = useCourse();
    const [videos, setVideos] = useState([]);
    const [displayedVideos, setDisplayedVideos] = useState([]);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(8); // Initial number of videos to display
    const [loading, setLoading] = useState(true); // State to track loading
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

                if (fetchedVideos?.length > 0) {
                    setVideos(fetchedVideos);
                    setDisplayedVideos(fetchedVideos.slice(0, 8));
                } else {
                    console.log('No videos found in the specified folder.');
                }
            } catch (error) {
                console.error('Error initializing Google API client:', error);
                setError('Failed to load videos. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false after content is loaded
            }
        };

        window?.gapi?.load('client', loadClient);
    }, [folderId]);

    const formatDuration = (millis) => {
        const totalSeconds = Math.floor(millis / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        if (hours > 0) {
            return `${hours}hr ${minutes}min`;
        }
        if (minutes > 0) {
            return `${minutes}min`;
        }
        return '<1min';
    };

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
        navigate(path);
    };

    const handleLoadMore = () => {
        const nextVisibleCount = visibleCount + 8;
        setVisibleCount(nextVisibleCount);
        setDisplayedVideos(videos.slice(0, nextVisibleCount));
    };

    const renderContent = () => {
        const videoCardClass = 'p-4 border-b-2 border-blue-300 text-lg hover:text-xl hover:bg-gradient-to-r from-blue-300 to-blue-200 cursor-pointer';
        const videoNameClass = 'font-medium flex justify-between';

        return (
            <>
                {displayedVideos.map((video) => (
                    <div key={video?.id} className={videoCardClass} onClick={() => handleVideoSelect(video)}>
                        <div className={videoNameClass}>
                            <span>{video?.name}</span>
                            <span className="text-sm ml-2">
                                {formatDuration(video?.videoMediaMetadata?.durationMillis)}
                            </span>
                        </div>
                    </div>
                ))}
                {visibleCount < videos.length && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-4 w-full text-black border-2 border-black px-4 py-2 rounded-lg hover:bg-slate-500 hover:text-white"
                    >
                        View More
                    </button>
                )}
            </>
        );
    };

    return (
        <div className="rounded-xl mt-3">
            <div className="w-full">
                <div className="p-6 h-full border-2">
                    <div className="bg-white h-full rounded-lg text-center text-2xl">
                        {loading ? <div>Loading...</div> : error ? <div>{error}</div> : renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlaylist;
