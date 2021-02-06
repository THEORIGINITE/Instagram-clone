import React from 'react'
import './Widget.css';
function Widget() {
    return (
        <div className="widget">
         <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=300&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width="300" height="700" style={{border:"none",overflow:"hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
    )
}

export default Widget
