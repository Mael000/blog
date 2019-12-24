---
date: "2019-01-20"
title: "How to get Video details from YouTube with C# - featuring Nanowar of Steel!"
category: "C#"
tags: ['C#', '.NET Core', 'YouTube']
---

Last time I talked about how to retrieve a list of YouTube videos by its channel ID.

Now it's time to check the details of a single video.
Let's say that you like a song, you listen to it at least 2 times a day and you want to download its description because it contains the lyrics. Just copy and paste? Nah, too easy! 😁

ps: here's the song: you'll thank me later

{% youtube CzvQxQYKO88 %}

## Initial steps
The basic setup is the same I explained in [my previous article](../youtube-video-search/article.md).

What you need to do is:

1. Retrieve you API key;
2. Create a .NET Core application
3. Install `Google.Apis` and `Google.Apis.YouTube.v3` NuGet packages
4. Create the class that will hold the video details:

```csharp
public class YouTubeVideoDetails
{
    public string VideoId { get; set; }
    public string Description { get; set; }
    public string Title { get; set; }
    public string ChannelTitle { get; set; }
}
```

Also, since you want to get the details of a video, you need the VideoId. You can retrieve it in 2 ways: programmatically, using the procedure from the previous article, or analyzing the YouTube URL: if we have https://www.youtube.com/watch?v=CzvQxQYKO88, the id is _CzvQxQYKO88_.

Now we have everything we need. Let's go!

## Add a YouTube service

Again, we need to instantiate the YouTube service.

```csharp
using (var youtubeService = new YouTubeService(new BaseClientService.Initializer()
{
    ApiKey = '<your api key>'
}))
{
    // todo 
}
```

## Download video details

Since YouTube provides an object for each service, we must use the correct one, and then we need to specify the video ID:

```csharp
var searchRequest = youtubeService.Videos.List("snippet");
searchRequest.Id = "CzvQxQYKO88";
```

Once we have created the request, we need to retrieve the result:

```csharp
var searchResponse = searchRequest.ExecuteAsync().Result;
```
The searchResponse object contains various information shared with other services, like pagination. We don't need those info, and we can go straight to the video details:

```csharp
var youTubeVideo = searchResponse.Items[0];
```

Finally, we can populate our YouTueVideoDetails object:

```csharp
 YouTubeVideoDetails videoDetails = new YouTubeVideoDetails()
                {
                    VideoId = youTubeVideo.Id,
                    Description = youTubeVideo.Snippet.Description,
                    Title = youTubeVideo.Snippet.Title,
                    ChannelTitle = youTubeVideo.Snippet.ChannelTitle
                };
```

## Final result
Ok, we are ready to join all the pieces of the puzzle!

```csharp
public YouTubeVideoDetails GetVideoDetails()
{
    YouTubeVideoDetails videoDetails = null;
    using (var youtubeService = new YouTubeService(new BaseClientService.Initializer()
    {
        ApiKey = "<your-api-key>",
    }))
    {
        var searchRequest = youtubeService.Videos.List("snippet");
        searchRequest.Id = "CzvQxQYKO88";
        var searchResponse = searchRequest.ExecuteAsync().Result;

        if (searchResponse.Items.Count == 0)
            return null;

        var youTubeVideo = searchResponse.Items[0];
        videoDetails = new YouTubeVideoDetails()
        {
            VideoId = youTubeVideo.Id,
            Description = youTubeVideo.Snippet.Description,
            Title = youTubeVideo.Snippet.Title,
            ChannelTitle = youTubeVideo.Snippet.ChannelTitle
        };
    }
    return videoDetails;
}
```

Now we have the song's lyrics, and we are ready to learn about macroeconomics, power metal and inflation!