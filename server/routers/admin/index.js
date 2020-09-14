module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')
  const Admin = require('../../models/Admin.js')
  const Music = require('../../models/Music.js')
  const Singer = require('../../models/Singer.js')
  const bcrypt = require('bcryptjs')
  const resourceMiddleware = require('../../middleware/resource')
   //获取所有资源
   router.get('/', async (req, res) => {
     if(Music!=req.Model){
     const data = await req.Model.find()
     res.send(data)
     }else{
     const data =  await req.Model.aggregate([
      {
        $lookup: {
          from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        }
      }
    ])
     res.send(data)
     }
  })

  // 获取资源详情
  router.get('/:id', async (req, res) => {
    const data = await req.Model.findById(req.params.id)
    res.send(data)
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    const data = await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      status: 0,
      message: '删除成功'
    })
  })

  //获取搜索资源
  router.get('/search/:input', async (req, res) => {
    const input = req.params.input
    const reg = new RegExp(input, 'i')
    if(Music!=req.Model){
      const data =  await req.Model.aggregate([
      {
        $match: {
          '$or': [
            {
              'username': {$regex:reg}
            },
            {
              'singer_name': {$regex:reg}
            },
          ]
        }
      }
    ])
      res.send(data)
     }else{
      const data =  await req.Model.aggregate([
      {
        $lookup: {
          from: 'singer',
          localField: 'singers',
          foreignField: '_id',
          as: 'singers_list'
        },
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
            },
            {
              'categories.title': {$regex:reg}
            }
          ]
        }
      }
    ])
     res.send(data)
     }
  })

  // 创建资源
  router.post('/', async (req, res) => {
    const data = await req.Model.create(req.body)
    res.send({
      status: 0,
      message: "保存成功"
    })
  })

  // 更新资源
  router.put('/:id', async (req, res) => {
    const data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      status: 0,
      message: "保存成功"
    })
  })

  app.use('/admin/api/rest/:resource',  resourceMiddleware(), router)
    // 登录
  app.post('/admin/api/login', async (req, res) => {
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
    const admin = await Admin.findOne({username}).select('+password')
    if (!admin) {
      res.status(422).send({
        message: "用户名或密码错误"
      })
      return;
    }
    // 2. 验证密码是否合法
    const isValid = bcrypt.compareSync(password, admin.password)
    if (!isValid ) {
      res.status(422).send({
        message: "用户名或密码错误"
      })
      return;
    }
    res.send({
      status: 0,
      username: admin.username,
    })
  })
}