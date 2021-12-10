const express = require("express")
const app = express.Router()
const pool = require("../database")

app.get("/add", (req, res) => { 
    res.render("links/add")
})

app.post("/add", async (req, res) => { 
    const { title, url, description } = req.body;
    const newLink = { 
        title,
        url,
        description
    } 
    await pool.query('INSERT INTO links set ?', [newLink])
    res.redirect("/links")
})

app.get('/', async (req, res) => { 
    const links = await pool.query("SELECT * FROM links");
    console.log(links)
    res.render('links/list', {links})
})

app.get("/delete/:id", async (req, res) => { 
    const { id } = req.params
    await pool.query('DELETE FROM links WHERE ID = ?', [id])
    res.redirect("/links")
})

app.get("/edit/:id", async (req, res) => { 
    const { id } = req.params
    const link = await pool.query('SELECT * FROM links WHERE id = ?', [id])
    res.render("links/edit", {link: link[0]})
})

app.post("/edit/:id", async (req, res) => { 
    const { id } = req.params;
    const { title, description, url } = req.body;
    const LinkNew = { 
        title,
        description,
        url
    }
    await pool.query("UPDATE links set ? WHERE id = ?", [LinkNew, id])
    res.redirect("/links")
})

module.exports = app;