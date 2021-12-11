const express = require("express")
const app = express.Router()
const pool = require("../database")
const { isLoggedIn } = require("../lib/auth")

app.get("/add", (req, res) => { 
    res.render("links/add")
})

app.post("/add", isLoggedIn, async (req, res) => { 
    const { title, url, description } = req.body;
    const newLink = { 
        title,
        url,
        description,
        user_id: req.user.id
    } 
    await pool.query('INSERT INTO links set ?', [newLink])
    req.flash('success', 'Link saved successfully')
    res.redirect("/links")
})

app.get('/', isLoggedIn, async (req, res) => { 
    const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [req.user.id]);
    console.log(links)
    res.render('links/list', {links})
})

app.get("/delete/:id", isLoggedIn, async (req, res) => { 
    const { id } = req.params
    await pool.query('DELETE FROM links WHERE ID = ?', [id])
    req.flash('success', 'Link removed successfully')
    res.redirect("/links")
})

app.get("/edit/:id", isLoggedIn, async (req, res) => { 
    const { id } = req.params
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id])
    res.render("links/edit", {link: link[0]})
})

app.post("/edit/:id", isLoggedIn, async (req, res) => { 
    const { id } = req.params;
    const { title, description, url } = req.body;
    const LinkNew = { 
        title,
        description,
        url
    }
    await pool.query("UPDATE links set ? WHERE id = ?", [LinkNew, id])
    req.flash('success', 'Link edited successfully')
    res.redirect("/links")
})

module.exports = app;