import { useState } from 'react';

const Blog = ({blog}) => {

  const [showDetail, setShowDetails] = useState(false);

  const hide = { display: showDetail ? 'none' : '' }
  const show = { display: showDetail ? '' : 'none' }

  return (
    <div className="blog"> 
        <div>
          {blog.title} {blog.author} 
          
          <button 
            style={hide} 
            onClick={() => setShowDetails(!showDetail)}
          >view</button> 

          <button 
            style={show} 
            onClick={() => setShowDetails(!showDetail)}
          >hide</button> 

        </div>
        <div style={show}>
          <div>
            {blog.url}
          </div>
          <div>
            likes {blog.likes}
          </div>
          <div>
            {blog.user.name}
          </div>
        </div>

    </div>  
  )

}

export default Blog