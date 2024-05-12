const getProfileFeeds = async () => {
    try {

        const token = request.headers.get("authorization")
        if (!token) {
            return Response.json({
                code: 0,
                message: "Token not found",
                status_code: 404,
                data: {}
            }, { status: 404 })
        }

        let verify_id = jwt.verify(token, secret) as { email: string, id: string } as any

        const authorId = verify_id.id

        if (!verify_id) {
            console.log("Invalid token")
            return Response.json({
                code: 0,
                message: "Invalid token",
                status_code: 404,
                data: {}
            }, { status: 404 })
        }
        // profile verification
        const data = await db.select({
            // id: followers.followingUserId,
            // post: {
            id: posts.id,
            caption: posts.caption,
            fileUrl: posts.fileUrl,
            commentCount: count(eq(comments.postId, posts.id)),
            likeCount: count(eq(likes.postId, posts.id)),
            createdAt: posts.createdAt,
            alreadyLiked: eq(likes.authorId, authorId),
            // },
            authorData: {
                id: users.id,
                username: users.username,
                email: users.email,
                profilePicture: users.profilePicture,
            },
        })
            .from(followers)
            .where(eq(followers.followerUserId, authorId))
            .limit(12)
            .offset(0)
            .orderBy(desc(posts.createdAt))
            .leftJoin(posts, eq(followers.followingUserId, posts.authorId))
            .leftJoin(comments, eq(posts.id, comments.postId))
            .leftJoin(likes, eq(posts.id, likes.postId))
            .innerJoin(users, eq(posts.authorId, users.id))
            .groupBy(
                posts.id,
                users.id,
                posts.createdAt,
                followers.followingUserId,
                followers.createdAt,
                comments.postId,
                likes.postId,
                likes.authorId,
            )

        // console.log(data,"data")

        return NextResponse.json({
            code: 1,
            message: "post Fetched Successfully",
            status_code: 200,
            data: data
        }, { status: 200 })

    } catch (error) {
        console.log(error)
        return Response.json({
            code: 0,
            message: "Internal Server Error",
            status_code: 500,
            data: {}
        }, { status: 500 })
    }
}


export {
    getProfileFeeds
}