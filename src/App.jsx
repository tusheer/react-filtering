import axios from 'axios';
import React from 'react';
import './App.css';
function App() {
    const [search, setSearch] = React.useState('');
    const [posts, setPosts] = React.useState([]);
    const [filterPosts, setFilterPost] = React.useState([]);
    const onChange = (event) => {
        const filterBytile = posts.filter((data) => {
            return data.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase());
        });

        setFilterPost(filterBytile);
        setSearch(event.target.value);
    };

    React.useEffect(() => {
        const getPostFromJson = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setPosts(response.data);
            } catch (error) {}
        };
        getPostFromJson();
    }, []);

    const actualRendarData = !filterPosts.length ? posts : filterPosts;
    return (
        <div className='App'>
            <div className='search__wraper'>
                <div className='form_wraper'>
                    <form>
                        <label htmlFor='search'>Search Here</label>
                        <input name='search' value={search} onChange={onChange} placeholder='Search by Title' />
                    </form>
                </div>
                <div className='data_wraper'>
                    {actualRendarData.map((post) => {
                        return (
                            <div key={post.id} className='signle_post'>
                                {post.title}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
