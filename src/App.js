export default function MainScreen(){
    return(
        <ul>
        {[0,1,2].map(story => (
            <li key={story}>
            {story}
            </li>
        ))}
        </ul>
    )
}