import styles from '../../styles/Slug.module.css';          //import styles from Slug.module.css and helps in creating the website for each blog
import {GraphQLClient, gql} from 'graphql-request';         //imports graphQLClient as well gql for the same purposes as before

const graphcms = new GraphQLClient('https://api-ap-south-1.hygraph.com/v2/cljctihvn05zs01uk90k11qho/master');

const QUERY = gql`
  query Post($slug: String!){
    post(where: {slug: $slug}){
        id,
        title,
        slug,
        dataPublished,
        author{
            id,
            name,
            avatar{
                url
            }
        }
        content{
            html
        }
        coverPhoto{
            id,
            url
        }
    }
  }
`;

//puts the slugs of each post in the SLUGLIST
const SLUGLIST = gql`
    {
        posts{
            slug
        }
    }
`
//calls the getStaticPaths to request for the SLUGLIST for all the posts, and now the slugs of each post is being stores in params. With fallback false means you have to build in order to see changes in your website
export async function getStaticPaths(){
    const {posts} = await graphcms.request(SLUGLIST);
    return{
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
}
//the params, basically the slugs are taken as the arguments, and then store it in slug. Then query from GraphQL using slug to get the data from each post, and now the data returned will be specific to each post and is stored in post
export async function getStaticProps({ params }){
  const slug = params.slug;
  const data = await graphcms.request(QUERY,{ slug });
  const post = data.post;
  return {
    props:{
      post,
    },
    revalidate: 10,
  };
}
//the data for each post is taken as an argument
export default function BlogPost({post}){
    //name of each blog is written as .blog and the children element are given their names as well and slug.module.css helps to create the CSS for each blog
    return(
        <main className={styles.blog}>
            <img src={post.coverPhoto.url} className={styles.cover} alt="" />
            <div className={styles.rightside}>
                <div className={styles.title}>
                    <img src={post.author.avatar.url} alt="" />
                    <div className={styles.authtext}>
                        <h3>By {post.author.name}</h3>
                        <h4 className={styles.date}>{post.dataPublished}</h4>
                    </div>
                </div>
                <div className={styles.con}>
                    <div
                     className={styles.content}
                     dangerouslySetInnerHTML={{__html: post.content.html}}>
                    </div>
                </div>
            </div>
        </main>
    )
}