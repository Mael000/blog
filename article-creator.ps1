$newFolderName =  Read-Host -Prompt 'Folder name?'
Set-Location ".\blog"

New-Item -Path "." -Name $newFolderName -ItemType "directory"

Set-Location $newFolderName

Add-Content article.md "---"
Add-Content article.md "date: `"4219-11-20`""
Add-Content article.md "title: `"Placeholder article`""
Add-Content article.md "tags: []"
Add-Content article.md "banner: `"`""
Add-Content article.md "description : `"`""
Add-Content article.md "slug: `'`'"
Add-Content article.md "---"
