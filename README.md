This is a personal webpage project developed using Next.js and Tailwind CSS for layout. For showcasing skills, it includes an application that uses DynamoDB to store data and S3 for temporary file URLs.

The project is written in TypeScript and is automatically deployed using AWS Amplify.

To run the app locally, you need to install next.js, marked, and Google Gemini, and set the following environment variables:
<ul>
	<li>S3_BUCKETNAME="your S3 bucket name"</li>

<li>REMOTE_IMAGE_URL="your s3 url"</li>
<li>MYINFO_KEY="your personal information txt file, it must be saved in S3 bucket"</li>
<li>ACCESS_KEY_ID="your AWS ACCESS_KEY_ID"</li>
<li>SECRET_ACCESS_KEY="your AWS SECRET_ACCESS_KEY"</li>
<li>GEMINI_API_KEY="your Google gemini API key"</li>
</ul>
Once these dependencies and environment variables are set, you can run the project locally.

The project employs a database request caching strategy, with a default cache duration of 24 hours. This means the website will only connect to the database once a day. This strategy is excellent for data that is not sensitive to updates, significantly reducing the latency caused by database access and ensuring the performance of the webpage.
