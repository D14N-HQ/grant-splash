/*------------------------------------------------------------------
jQuery document ready
-------------------------------------------------------------------*/
$(document).ready(function () {
	"use strict";

	// Medium posts
	const $posts = $('#medium-posts');
	if ($posts.length) {
		$.get('https://api.rss2json.com/v1/api.json', {
			rss_url: 'https://medium.com/feed/@wbobeirne',
		}).then(function(res) {
			$posts.html('');
			const items = (res.items || []).slice(0, 3);
			items.forEach(function(item) {
				$posts.append(
					'<a href="' + item.link + '">' +
						'<div class="mediumposts__post">' +
							'<div class="mediumposts__post__thumb" style="background-image: url(' + item.thumbnail.replace('1024', '256') + ')"></div>' +
							'<div>' +
								'<h3 class="mediumposts__post__title">' + item.title + '</h3>' +
								'<div class="mediumposts__post__data">Posted ' + new Date(item.pubDate).toLocaleDateString() + '</div>' +
							'</div>' +
						'</div>' +
					'</a>'
				);
			});

			if (!items.length) {
				$posts.html('<div class="mediumposts__empty">No posts (yet!)</div>');
			}
		});
	}
});
