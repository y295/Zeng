module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')
  const User = require('../../models/User.js')
  const Music = require('../../models/Music.js')
  const Singer = require('../../models/Singer.js')
  const Category = require('../../models/Category.js')
  const bcrypt = require('bcryptjs')

   // 获取音乐推荐
  router.get('/musics/recommend', async (req, res) => {
    const data = await Music.aggregate([
      {
        $lookup: {
        from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        }
      },
      {
        $match: {
          recommend: true
        }
      },
      {
        $sort: {
         createdAt: -1
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          music_name: 1,
          music_address: 1,
          singers_list:{
            _id: 1,
            singer_name: 1
          }
        }
      }
    ])
    res.send(data)
  })

  // 获取最新音乐
  router.get('/musics/new', async (req, res) => {
    const data = await Music.aggregate([
      {
        $lookup: {
          from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        }
      },
      {
        $sort: {
         createdAt: -1
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          music_name: 1,
          music_address: 1,
          singers_list:{
            _id: 1,
            singer_name: 1
          }
        }
      }
    ])
    res.send(data)
  })

  //推荐歌手
   router.get('/singers/recommend', async (req, res) => {
    const data = await Singer.aggregate([
      {
        $match: {
          recommend: true
        }
      },
      {
        $sort: {
         createdAt: -1
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          singer_name: 1,
        }
      }
    ])
    res.send(data)
  })

  //收藏音乐
  router.put('/musics/collection/:username/:id', async (req, res) => {
    const username = req.params.username
    const id =  req.params.id
    const data1 = await User.update({username}, {$push:{"my_music": id}})
    const data2 = await Music.update({"_id": id}, {$inc:{collection_num: 1}})
    res.send("")
  })

  //删除收藏歌曲
   router.delete('/musics/delete/:username/:id', async (req, res) => {
    const username = req.params.username
    const id =  req.params.id
    const data1 = await User.update({username}, {$pull:{"my_music": id}})
    const data2 = await Music.update({"_id": id}, {$inc:{collection_num: -1}})
    res.send("")
  })

  //收藏列表
  router.get('/musics/collection/:username', async (req, res) => {
    const username = req.params.username
    const data = await Music.aggregate([
      {
        $lookup: {
          from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        }
      },
      {
        $lookup: {
          from: 'user',
          localField: '_id',
          foreignField: 'my_music',
          as: 'users_list'
        }
      },
      {
        $match: {
          "users_list.username": username
        }
      },
      {
        $sort: {
         music_name: 1
        }
      },
      {
        $project: {
          music_name: 1,
          music_address: 1,
          singers_list:{
            _id: 1,
            singer_name: 1
          }
        }
      }
    ]).collation({locale: "zh"})
    res.send(data)
  })

  //歌手介绍
  router.get('/singers/introduce/:id', async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    const data = await Singer.aggregate([

      {
        $match: {
          "_id": id
        }
      },
      {
        $project: {
          introduce: 1,
          photo_address: 1
        }
      }
    ])
    res.send(data)
  })
 //歌手音乐
 router.get('/singers/music_list/:id', async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    const data = await Music.aggregate([
       {
        $lookup: {
          from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        }
      },
       {
        $lookup: {
          from: 'category',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $match: {
          "singers_list._id": id
        }
      },
      {
        $project: {
          music_name: 1,
          music_address: 1,
          singers_list: {
            _id: 1,
            singer_name: 1
          },
          categories: {
            _id: 1,
            title: 1
          }

        }
      }
    ])
    res.send(data)
  })

//音乐排行榜
 router.get('/musics/ranking', async (req, res) => {
    const data = await Music.aggregate([
       {
        $lookup: {
          from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        }
      },
      {
        $sort: {
         collection_num: -1
        }
      },
      {
        $limit: 13
      },
       {
        $lookup: {
          from: 'category',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },

      {
        $project: {
          music_name: 1,
          music_address: 1,
          collection_num: 1,
          singers_list: {
            _id: 1,
            singer_name: 1
          },
          categories: {
            _id: 1,
            title: 1
          }

        }
      }
    ])
    res.send(data)
  })

 //获取分类标签
 router.get('/tags', async (req, res) => {
    const data = await Category.find()
    res.send(data)
  })

//获取全部音乐
  router.get('/musics/musicbook/:pageNum', async (req, res) => {
    const currentPage = req.params.pageNum;
    const list = await Music.aggregate([
       {
        $lookup: {
          from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        }
      },
      {
        $lookup: {
          from: 'category',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $sort: {
         createdAt: -1
        }
      },
      {
        $skip: (currentPage - 1) * 10
      },
      {
        $limit: 10
      },
      {
        $project: {
          music_name: 1,
          music_address: 1,
          collection_num: 1,
          singers_list: {
            _id: 1,
            singer_name: 1
          },
          categories: {
            _id: 1,
            title: 1
          }

        }
      }
    ])
    const count = await Music.find().lean().count()
    const totalPage = Math.ceil(count / 10)
    res.send({
      list,
      totalPage,
      currentPage
    })
  })

  //获取分类音乐
   router.get('/musics/musicbook/:id/:pageNum', async (req, res) => {
     const currentPage = req.params.pageNum;
     const id = mongoose.Types.ObjectId(req.params.id)
     const list = await Music.aggregate([
       {
        $lookup: {
          from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        }
      },
      {
        $lookup: {
          from: 'category',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $match: {
          "categories._id": id
        }
      },
      {
        $sort: {
         createdAt: -1
        }
      },
      {
        $skip: (currentPage - 1) * 10
      },
      {
        $limit: 10
      },
      {
        $project: {
          music_name: 1,
          music_address: 1,
          collection_num: 1,
          singers_list: {
            _id: 1,
            singer_name: 1
          },
          categories: {
            _id: 1,
            title: 1
          }

        }
      }
    ])
    const count = await Music.find({categories: id}).lean().count()
    const totalPage = Math.ceil(count / 10)
    res.send({
      list,
      totalPage,
      currentPage
    })
  })

//获取所有歌手
  router.get("/musics/singerbook/:pageNum", async (req, res) => {
    const currentPage = req.params.pageNum;
    const list = await Singer.aggregate([

      {
        $sort: {
         singer_name: 1
        }
      },
      {
        $skip: (currentPage - 1) * 40
      },
      {
        $limit: 40
      },
      {
        $project: {
          singer_name: 1,
        }
      }
    ]).collation({locale: 'zh'})
    const count = await Singer.find().lean().count()
    const totalPage = Math.ceil(count / 40)
    res.send({
      list,
      totalPage,
      currentPage
    })
  })

//获取搜索结果
   router.get('/musics/search/:input/:pageNum', async (req, res) => {
     const currentPage = req.params.pageNum;
     const input = req.params.input
     const reg = new RegExp(input, 'i')
     const list = await Music.aggregate([
       {
        $lookup: {
          from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        }
      },
      {
        $lookup: {
          from: 'category',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $match: {
          '$or': [
            {
              'music_name': {$regex:reg}
            },
            {
              'singers_list.singer_name': {$regex:reg}
            }
          ]
        }
      },
      {
        $sort: {
         createdAt: -1
        }
      },
      {
        $skip: (currentPage - 1) * 11
      },
      {
        $limit: 11
      },
      {
        $project: {
          music_name: 1,
          music_address: 1,
          collection_num: 1,
          singers_list: {
            _id: 1,
            singer_name: 1
          },
          categories: {
            _id: 1,
            title: 1
          }

        }
      }
    ])
    const count = await Music.find({
          '$or': [
            {
              'music_name': {$regex:reg}
            },
            {
              'singers_list.singer_name': {$regex:reg}
            }
          ]
        }).lean().count()
    const totalPage = Math.ceil(count / 11)
    res.send({
      list,
      totalPage,
      currentPage
    })
  })

  app.use('/web/api',  router)
    // 登录
  app.post('/web/api/login', async (req, res) => {
    const { username, password } = req.body
    if (!username) {
      res.status(422).send({
        message: "用户名为空"
      })
      return;
    }
    if (!password) {
      res.status(422).send({
        message: "密码为空"
      })
      return;
    }
    // 1.验证用户名是否存在
    const user = await User.findOne({username}).select('+password')
    if (!user) {
      res.status(422).send({
        message: "用户名或密码错误"
      })
      return;
    }
    // 2. 验证密码是否合法
    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) {
      res.status(422).send({
        message: "用户名或密码错误"
      })
      return;
    }
    res.send({
      status: 0,
      username: user.username,
    })
  })

  //注册
    app.post('/web/api/register', async (req, res) => {
    const { username, password, again_password } = req.body
    if (!username) {
      res.status(422).send({
        message: "用户名为空"
      })
      return;
    }
    if (!password) {
      res.status(422).send({
        message: "密码为空"
      })
      return;
    }
     if (!again_password) {
      res.status(422).send({
        message: "确认密码为空"
      })
      return;
    }
    if (again_password!=password) {
      res.status(422).send({
        message: "前后密码不一致"
      })
      return;
    }
    const user = await User.findOne({username})
    if(user){
      res.status(422).send({
        status: 1,
        message: "用户名存在"
      })
    }else{
    const data = await User.create(req.body)
    res.send({
      status: 0,
      message: "注册成功"
    })
   }
  })
}