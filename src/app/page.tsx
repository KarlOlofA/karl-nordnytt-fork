import {fetchStories} from "@/app/fetch-stories";
import {LoadMoreStories} from "@/app/load-more-stories";
import {StoryProps} from "@/app/stories";

export default async function Home() {
    const initStories: StoryProps = await fetchStories({page: 0, fetchTopStories: true});

    return (
        <main>
            <LoadMoreStories stories={initStories.stories} hasMoreStories={initStories.hasMoreStories}></LoadMoreStories>
        </main>
    );
}
