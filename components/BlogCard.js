import Link from 'next/link';                               //imports the Link from nextJS
import styles from '../styles/BlogCard.module.css';         //import the styles which are going to be used to style each blog

export default function BlogPost({                          //a function called BlogPost is being made, which takes arguments such as title,author,coverPhoto,dataPublished,slug
     title,
     author,
     coverPhoto,
     dataPublished,
     slug,
}) {
    return(
        //call each blog the card, every time the image in the blog is clicked it routes to usual URL + URL of the slug, image URL is present in imgContainer,  and the text below the image is taken care by the class .text which does the editing 
        <div className={styles.card}>                           
            <Link href={'/posts/' + slug}>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} alt="" />
                </div>
            </Link>
            <div className={styles.text}>
                <h2>{title}</h2>
                <div className={styles.details}>
                    <div className={styles.author}>
                        <img src={author.avatar.url} alt="" />
                        <h3>{author.name}</h3>
                    </div>
                    <div className={styles.date}>
                        <h3>{dataPublished}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}