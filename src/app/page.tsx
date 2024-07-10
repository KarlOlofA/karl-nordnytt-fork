import {LoadMoreStories} from "@/app/Components/load-more-stories";
import {Story} from "@/types";
import {fetchStories} from "@/services/hn";

export default async function Home() {
    const initStories: { stories: Awaited<Story>[]; hasMoreStories: boolean } = await fetchStories({page: 0, fetchTopStories: true});

    return (
        <main>
            <LoadMoreStories stories={initStories.stories} hasMore={initStories.hasMoreStories}></LoadMoreStories>
        </main>
    );
}
