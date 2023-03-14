
const BlogForm = ({ handleSave, title, setTitle, author, setAuthor, url, setUrl}) => {
    return (
        <form onSubmit={handleSave}>
            <div>
                <div>
                    <h3>create new</h3>
                </div>
                <div>
                    title: 
                    <input 
                        type="text"
                        value={title}
                        name="title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author: 
                    <input 
                        type="text"
                        value={author}
                        name="author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url: 
                    <input 
                        type="text"
                        value={url}
                        name="url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
            </div>
            <button type="submit">create</button>
        </form>
    );
}

export default BlogForm;