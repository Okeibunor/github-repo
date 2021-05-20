
import fetch from "node-fetch"

const github_data = {
    "token": process.env.API_KEY,
    "username": "Okeibunor"
}

// GraphQL Query 
const body = {
    "query": `
    query{
      user(login: "Okeibunor") {
        avatarUrl,
        login,
        name,
        bio,
        repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name,
            url,
            description,
            updatedAt,
            forkCount,
            stargazerCount,
            primaryLanguage {
              name,
              color
            }
          }
        }
      }
    }`
}

const baseUrl = "https://api.github.com/graphql";

const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + github_data.token
}

exports.handler = async (event, context) => {
    let response
    try {
        response = await fetch(baseUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        }).then(response => response.json()).then(data => data)
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message
            })
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            data: response
        })
    }
}

