const graphql = require('graphql')
const fetch = require('node-fetch')


const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID
} = graphql 


const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        body: {
            type: GraphQLString
        }
    }
})


const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'This is my post type',
    fields: {
        id: {
            type: GraphQLInt
        },
        title: {
            type: GraphQLString
        },
        body: {
            type: GraphQLString
        },
        comments: {
            type: new GraphQLList(CommentType),
            async resolve(parentValue) {
                const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${parentValue.id}/comments`)
                return post.json()
            }
        }
    }
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        posts: {
            type: new GraphQLList(PostType),
            args: {},
            async resolve(parentValue, args) {
                const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
                return posts.json();
            }
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parentValue, args) {
                const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
                return post.json()
            }
        }
    }
})

// Exportando a Root Query
module.exports = new GraphQLSchema({
    query: RootQuery
}) 