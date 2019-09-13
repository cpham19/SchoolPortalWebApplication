<template>
        <v-layout>
            <v-flex xs12 sm12>
                <v-btn v-on:click="back()" class="info" type="submit">Back</v-btn>
                <br/>
                <h1 align="center" class="display-3">{{thread.title}}</h1>
                <v-card color="cyan darken-2" class="white--text">
                    <v-card-title primary-title>
                        <div id="content">
                            <div id="left">
                                {{thread.postedDate}}<br/>
                                <v-img :src="thread.author.avatar" height="125px" contain></v-img><br/>
                                <a v-on:click="navigateTo({name: 'User', params: {userId: thread.author._id, threadId: thread._id}})">{{thread.author.userName}}</a><br/>
                                <v-card-actions class="justify-center">
                                    <v-btn v-show="isUserProfessor || user.userName === thread.author.userName" :to="{name: 'ThreadEdit', params: {threadId: thread._id}}" class="info" type="submit">Edit</v-btn>
                                </v-card-actions>
                            </div>
                            <div id="right">{{thread.description}}</div>
                        </div>
                    </v-card-title>
                </v-card>
                <br/>
                <div v-for="reply in thread.replies" :key="reply._id">
                    <v-card color="cyan darken-2" class="white--text">
                        <v-card-title primary-title>
                            <div id="content">
                                <div id="left">
                                    {{reply.postedDate}}<br/>
                                    <v-img :src="reply.author.avatar" height="125px" contain></v-img><br/>
                                    <a v-on:click="navigateTo({name: 'User', params: {userId: reply.author._id, threadId: thread._id}})">{{reply.author.userName}}</a>
                                    <br/>
                                    <v-card-actions class="justify-center">
                                        <v-btn v-show="isUserProfessor || user.userName === reply.author.userName" :to="{name: 'ReplyEdit', params: {replyId: reply._id}}" class="info" type="submit">Edit</v-btn>
                                        <v-btn v-on:click="removeReply(reply._id)" v-show="user.userName === reply.author.userName" class="error" type="submit">Remove</v-btn>
                                    </v-card-actions>
                                </div>
                                <div id="right">{{reply.description}}</div>
                            </div>
                        </v-card-title>
                    </v-card>
                    <br />
                </div>
                <!-- For creating a new reply to a thread -->
                <v-textarea v-model="newReply" label="description of reply" outline></v-textarea>
                <v-btn v-on:click="addReply()" :disabled="!newReply" type="submit">Reply</v-btn>
                <div class="failed" v-show="failedAdd">{{error}}</div>
            </v-flex>
        </v-layout>
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
  },
  methods: {
    navigateTo: function(route) {
      this.$router.push(route)
    },
    back: function() {
      this.$router.push("/forum")
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

.thread-info-left {
    width: 80%;
    float: left;
}

.thread-info-right {
    width: 20%;
    float: right;
}

.strong {
    font-family: 'Rajdhani', sans-serif;
    font-weight: bold;
    font-size: 17px;
}

.table, th, td{
    border: 1px solid black;
}

.post-description {
    border: 1px solid black;
    vertical-align: top;
    text-align: left;
    height: 200px;
    width: 2000px;
}

.post-author {
    border: 1px solid black;
    vertical-align: center;
    text-align: center;
    height: 200px;
    width:200px; 
}

#content { 
  margin: 0;
  width: 100%;
  display: inline-block;
} 

#left {
    border: 1px solid black;
    vertical-align: center;
    text-align: center;
    width: 20%;
    height: 250px;
    float:left;
}

#right {
    border: 1px solid black;
    text-align: left;
    width: 79%;
    height: 250px;
    float:right;
}

/* unvisited link */
a {
    color:white;
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
</style>