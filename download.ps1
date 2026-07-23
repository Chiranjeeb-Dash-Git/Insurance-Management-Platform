$urls = @{
    'screen1' = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzk0YjkyMTVjZTBjYzQ0ODVhMmQxZTIzZmVkZWZiZjlkEgsSBxDCg6WqnB4YAZIBJAoKcHJvamVjdF9pZBIWQhQxODMwNzA2MDk4Njk3MzQwNjY4Mw&filename=&opi=89354086'
    'screen2' = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQ1NThjNzVmMzQ0ODRjNDc5ODc4ODViNTY5MDc5ZGRhEgsSBxDCg6WqnB4YAZIBJAoKcHJvamVjdF9pZBIWQhQxODMwNzA2MDk4Njk3MzQwNjY4Mw&filename=&opi=89354086'
    'screen3' = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2I0MzhkNzEwMDAzYzQxYmFiMTYwYzVlZGU3ZjZjOThlEgsSBxDCg6WqnB4YAZIBJAoKcHJvamVjdF9pZBIWQhQxODMwNzA2MDk4Njk3MzQwNjY4Mw&filename=&opi=89354086'
    'screen4' = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzg4MzNiYmU4NzUwMjQ0MjA4M2YwZWE2MTQyYmZlMmM5EgsSBxDCg6WqnB4YAZIBJAoKcHJvamVjdF9pZBIWQhQxODMwNzA2MDk4Njk3MzQwNjY4Mw&filename=&opi=89354086'
    'screen5' = 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzg3NmQ1ZGFiNjljOTQyYmQ4ZDA2NzFiMWQ5ZjdiZjVjEgsSBxDCg6WqnB4YAZIBJAoKcHJvamVjdF9pZBIWQhQxODMwNzA2MDk4Njk3MzQwNjY4Mw&filename=&opi=89354086'
}
foreach ($key in $urls.Keys) {
    Invoke-WebRequest -Uri $urls[$key] -OutFile "$key.html"
}
Write-Host "Downloaded screens successfully"
