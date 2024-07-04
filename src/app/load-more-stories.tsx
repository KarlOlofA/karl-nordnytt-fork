"use client";

import React, {useEffect, useState} from "react";
import {Story} from "@/types";
import {useInView} from "react-intersection-observer";
import {Spinner} from "@/app/spinner";
import {Stories, StoryProps} from "@/app/stories";
import {fetchStories} from "@/app/fetch-stories";

export function LoadMoreStories(initStories: StoryProps){
    let [filterText, setFilterText] = useState("Top Stories");
    let [fetchTopStories, setFetchTopStories] = useState(true);
    let [stories, setStories] = useState<Story[]>(initStories.stories);
    let [pagesLoaded = 0, setPagesLoaded] = useState(0);
    let [hasMoreStories, setHasMoreStories] = useState(initStories.hasMore);

    const {ref, inView} = useInView();

    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

    function clearStories() {
        setStories([]);
        setPagesLoaded(-1);
        setHasMoreStories(true)
    }

    function filterClick(){
        clearStories();
        setFetchTopStories(prev => !prev);

        if (fetchTopStories){
            setFilterText("New Stories")
            return;
        }

        setFilterText("Top Stories")
    }

    useEffect(() => {
        if (inView){
            loadMoreStories();
        }
    }, [inView]);


    const loadMoreStories = async () => {
        await delay(300);
        const nextPage = pagesLoaded + 1;
        const {stories: newStories, hasMoreStories} = await fetchStories({page: nextPage, fetchTopStories}) ?? {stories: [], hasMoreStories: false};
        setStories((prevStories: Story[]) => [...prevStories, ...newStories]);
        setPagesLoaded(nextPage);
        setHasMoreStories(hasMoreStories)
    };

    return(
        <>
            <div>
                <button onClick={filterClick}>Current Filter: {filterText}</button>
            </div>

            <Stories stories={stories} hasMore={hasMoreStories}/>

            {hasMoreStories && (
                <div
                    className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-end-3"
                    ref={ref}
                >
                    <Spinner/>
                </div>
            )
            }
        </>
    )
}