<template>
    <v-container  fluid fill-height grid-list-md>
        <v-layout align-center justify-center>
            <v-flex sm8>
                <v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
                <br/><br/>

                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">{{thread.title}}</h1>
                        <p class="lead">{{thread.description}}</p>
                        <hr class="my-4">
                        <p>Posted by <a :style="'color:blue;'" v-on:click="navigateTo({name: 'User', params: {userId: thread.author._id, threadId: thread._id}})">{{thread.author.userName}}</a> on {{thread.postedDate}}</p>
                        <div v-show="isUserProfessor || thread.author._id === user._id" class="btn-group">
                            <v-btn :to="{name: 'ThreadEdit', params: {courseId: cid, courseName: cname, threadId: thread._id}}" class="info blocks" type="submit"><i class="fas fa-edit"> Edit</i></v-btn>
                            <v-btn class="error blocks"><i class="fas fa-trash-alt"></i> Remove</v-btn>
                        </div>
                    </div>
                </div>
                <br/>

                 <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Reply Content</th>
                            <th scope="col">Poster</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr scope="row" v-for="reply in thread.replies" :key="reply._id">
                            <td>
                                {{reply.description}}
                                <br /><br /><br /><br />
                                <hr class="my-4">
                                Posted on {{reply.postedDate}}
                                <div class="btn-group" v-show="isUserProfessor || user.userName === reply.author.userName">
                                    <v-btn :to="{name: 'ReplyEdit', params: {courseId: cid, courseName: cname, threadId: tid, replyId: reply._id}}" class="info blocks" type="submit"><i class="fas fa-edit"></i> Edit</v-btn>
                                    <v-btn v-on:click="removeReply(reply._id)" class="error blocks" type="submit"><i class="fas fa-edit"></i> Remove</v-btn>
                                </div>
                            </td>
                            <td :style="'width:300px;'">
                                <div class="text-center">
                                    <v-img :src="reply.author.avatar" height="125px" contain></v-img>
                                    <br /><br />
                                    <a :style="'color:blue;'" v-on:click="navigateTo({name: 'User', params: {userId: reply.author._id, threadId: thread._id}})">{{reply.author.userName}}</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- For creating a new reply to a thread -->
                <div>
                    <v-textarea v-model="newReply" label="description of reply" :style="'color:black;background-color:white;'"></v-textarea>
                    <v-btn v-on:click="addReply()" :disabled="!newReply" type="submit">Reply</v-btn>
                    <div class="failed" v-show="failedAdd">{{error}}</div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ForumService from "@/services/ForumService"
import {mapState} from "vuex"

export default {
  name: 'ThreadView',        
  data () {
    return {
      thread: {},
      newReply: "",
      error: "",
      failedAdd: false,
      cid: "",
      cname: "",
      tid: "",
    }
  },
computed: {
    ...mapState([
      'user',
      'isUserLoggedIn',
      'isUserProfessor'
    ])
  },
  async mounted() {
    this.checkLoggedIn()
    this.getThreadAndReplies()
    this.cid = this.$store.state.route.params.courseId
    this.cname = this.$store.state.route.params.courseName
    this.tid = this.$store.state.route.params.threadId
  },
  methods: {
    navigateTo: function(route) {
      this.$router.push(route)
    },
    back: function() {
      this.$router.push("/forums")
    },
    checkLoggedIn: function() {
      if (!(this.isUserLoggedIn)) {
        this.$router.push("/")
      }
    },
    async getThreadAndReplies() {
        const threadId = this.$store.state.route.params.threadId
        const threadResponse = await ForumService.getThread(threadId)
        this.thread = threadResponse.data.thread

        const repliesResponse = await ForumService.getReplies()

        this.thread.replies = this.thread.replies.map(replyId => {
            let reply = null
            repliesResponse.data.replies.forEach(replyObj => {
                if (replyId === replyObj._id) {
                    reply = JSON.parse(JSON.stringify(replyObj))
                }
            })
            return reply
        })
    },
    async removeReply(replyId) {
        try {
            const response = await ForumService.removeReply(replyId)
            this.getThreadAndReplies()
            this.$router.push(`/forum/${this.thread._id}`)
        }
        catch(err) {
            this.error = err.response.data.error
        }
    },
    async addReply() {
        if (!this.newReply) {
            this.failedAdd = true
            this.error = "Empty description of reply!"
            return
        }

        const reply = {threadId: this.thread._id, description: this.newReply, author: {_id: this.user._id, userName: this.user.userName, avatar: this.user.avatar}}
        
        try {
            const response = await ForumService.addReply(reply)
            this.getThreadAndReplies()
            this.failedAdd = false
            this.successfulAdd = true
            this.newReply = ""

            this.$router.push(`/forum/${this.thread._id}`)
        }
        catch (err) {
            this.failedAdd = true
            this.successfulAdd = false
            this.error = err.response.data.error
        }
    }
  },
  components: {
  }
};
</script>

<style scoped>
.failed {
    color: red;
}

/* unvisited link */
a {
    color:blue;
}

/* unvisited link */
/* a:link {
  color: white;
  background-color: #f44336;
} */

/* visited link */
a:visited {
  color: green;
}

/* mouse over link */
a:hover {
  color: hotpink;
}

/* selected link */
a:active {
  color: red;
}

.white--card {
    border: 5px solid black;
}

 table, th, td {
        border: solid 5px;
        background: rgb(255, 255, 255);
    }
    td {
        height: 50px;
    }
    .btn-group {
        margin: auto;
        display: flex;
        flex-direction: row;
        justify-content: left;
    }

    .blocks
    {
        padding: 24px 12px;
        margin: 0 5px;  
        border-radius: 0;
    }

    @media (max-width: 768px) {
    }
</style>