import Head from 'next/head';                         //import head which is used to give the head to index.js file
import styles from '../styles/Home.module.css';       //import the styles of Home.module.css
import {GraphQLClient, gql} from 'graphql-request';   //import GraphQLClient which isused to get/connect the ContentAPI from GraphQL, gql helps in making queries to get the data of the contentAPI
import BlogCard from '../components/BlogCard';        //calls the BlogCard.js file

const graphcms = new GraphQLClient('https://api-ap-south-1.hygraph.com/v2/cljctihvn05zs01uk90k11qho/master');   //connects to the ContentAPI

//making queries to get the data, such as from the post model:id,title,dataPublished,etc is being brought
const QUERY = gql`            
  {
    posts{                   
      id,
      title,
      dataPublished,
      slug,
      content{
        html
      },
      author{
        name,
        avatar{
          url
        },
      },
      coverPhoto{
        url,
      },
    }
  }
`;


export async function getStaticProps(){                 //async function is a function which is allowed to make API calls, here, getStaticProps calls the ContentAPI
  const { posts } = await graphcms.request(QUERY);      //requests for the data from the ContentAPI through queries and the data is stores back in posts which is then passed to Home, revalidate basically asks for data every 10secs as data entered keeps changing
  return {
    props:{
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({posts}) {
  return (  
    //given the className .container, calls the BlogCard.js file by giving its function arguments which are the fields of every post one after the other
    <div className={styles.container}>        
      <Head>            
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>                
        {posts.map((post) => (
          <BlogCard 
          title={post.title}
          author={post.author}
          coverPhoto={post.coverPhoto}
          key={post.id}
          dataPublished={post.dataPublished}
          slug={post.slug}   />
        ))}
      </main>
    </div>
  )
}
