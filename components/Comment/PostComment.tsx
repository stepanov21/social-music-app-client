import { useDispatch } from 'react-redux'

import { setNameForReply } from '@/redux/slices/commentSlice'
import { AppDispatch } from '@/redux/store'
import UserBage from '@/ui/UserBage'
import { Comment } from '@/@types/graphql'
import { TRecursionComment } from '@/app/posts/[id]/page'

const PostComment = ({ user, id, content, children }: TRecursionComment) => {
  const dispatch = useDispatch<AppDispatch>()

  const nested = children
    ? children.map((comment, index: number) => {
        return (
          <PostComment
            key={comment.id}
            user={comment.user}
            id={comment.id}
            content={comment.content}
            children={comment.children}
          />
        )
      })
    : null

  return (
    <>
      <div>
        <div className="flex items-center">
          <UserBage {...user!} />
          <div
            onClick={() =>
              dispatch(
                setNameForReply({
                  replyId: id || null,
                  replyUser: user?.username || null,
                })
              )
            }
            className="ml-4 text-blueText underline"
          >
            Reply
          </div>
        </div>
        <p className="my-3 ml-2">{content}</p>
      </div>
      <div className="ml-6">{nested}</div>
    </>
  )
}

export default PostComment
