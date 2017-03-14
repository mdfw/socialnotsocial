# Why not PassportJS?

Early versions of Social, not Social used Passport JS for its authentication layer. Passport is an amazing library but it's complicated and the examples online often conflict themselves. I also realized that it wasn't going to meet my needs as we move into more difficult login issues around seeing a post that you've been invited to see. I decided to build a custom solution with ~200 lines of code vs including a full library.

I found a nice article that walked through some of the needs and issues, but I cannot find it anymore. It was similar to this: https://stormpath.com/blog/everything-you-ever-wanted-to-know-about-node-dot-js-sessions