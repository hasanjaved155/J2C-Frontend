import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import Review from '../reviewRating/Review';
import Review2 from '../reviewRating/Review2';
import { useCourse } from '../Contexts/CourseContext';


const CLIENT_ID = '441819453061-r02t424buu3pns7dp8lbqgq34p61vo8k.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCK3lwlm_4XX4J4iwTkDEBgQBclwENM7Xs';


const ListName = ({ FOLDER_ID, courseName, role, id, setRie }) => {
    const [videos, setVideos] = useState([]);
    const { selectedVideo, setSelectedVideo } = useCourse();

    // const FOLDER_ID = '1dirIBW4ukXYuZicWMiUvsRlE3cwsVsTM';

    useEffect(() => {
        const loadClient = async () => {
            try {
                // console.log('Initializing Google API client...');
                await window?.gapi?.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                });

                // console.log('Google API client initialized.');
                // console.log(`Fetching videos from folder: ${FOLDER_ID}`);

                const res = await window?.gapi?.client.request({
                    path: `https://www.googleapis.com/drive/v3/files`,
                    params: {
                        q: `'${FOLDER_ID}' in parents and mimeType='video/mp4'`,
                        fields: 'files(id, name)',
                        key: API_KEY,
                    },
                });

                const fetchedVideos = res?.result?.files;
                // console.log('Fetched videos:', fetchedVideos);

                if (fetchedVideos?.length > 0) {
                    setVideos(fetchedVideos);
                    if (!selectedVideo) {
                        setSelectedVideo(fetchedVideos[0]);
                    }
                } else {
                    console.log('No videos found in the specified folder.');
                }
            } catch (error) {
                console.error('Error initializing Google API client:', error);
            }
        };

        window?.gapi?.load('client', loadClient);
    }, [selectedVideo]);

    const handleVideoSelect = (video) => {
        setSelectedVideo(video);
    };

    return (
        <>
            <div className="grid grid-cols-2 bg-slate-950 items-center">
                <div className="bg-sky-50 rounded-r-[3rem] my-2  py-5">
                    <h1 className="text-3xl mb-3">{courseName}</h1>
                    <div className="overflow-scroll  overflow-x-hidden px-10" style={{ direction: "rtl" }}>
                        <div className="flex flex-col gap-4 h-[30rem] " style={{ direction: "ltr" }}>
                            {videos?.map((video) => (
                                <div
                                    className="flex cursor-pointer justify-between rounded-xl gap-1 hover:text-white hover:shadow-sky-200 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-r from-indigo-500 to-blue-700 p-2 transition-all duration-500"
                                    style={{ border: "1px solid gray" }}
                                    key={video.id}
                                    onClick={() => handleVideoSelect(video)}
                                >
                                    <div className="flex w-full justify-between ">
                                        <h2> {video?.name}</h2>

                                        <p className="flex gap-3"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                            <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                        </svg>
                                            View Count: ***</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-slate-950 h-full p-4">
                    <div className="h-full">

                        {selectedVideo && (
                            <div>
                                <h1 className='text-white'>{selectedVideo?.name}</h1>
                                <iframe
                                    className="w-full h-[33rem] rounded-lg"
                                    src={`https://drive.google.com/file/d/${selectedVideo?.id}/preview`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    sandbox="allow-same-origin allow-scripts"
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* <Review id={id} setRie={setRie} /> */}
            <Review2 id={id} setRie={setRie} />
        </>
    );
};

export default ListName;
