from django.core.management.base import BaseCommand
from django.db.models import Count
from blog.models import Article, Comment
from datetime import timedelta, datetime
from django.utils.timezone import utc


def now():
	return datetime.utcnow().replace(tzinfo=utc)


class Command(BaseCommand):
	help = 'Displays stats related to Article and Comment models'

	def handle(self, *args, **kwargs):
		From = now() - timedelta(hours=5)
		To = now()

		articles_published_in_last_5_hour = Article.objects.filter(
			created_on__gt=From, created_on__lte=To).count()
		comments_published_per_article = Comment.objects.filter(
			created_on__gt=From, created_on__lte=To).values(
		'article').annotate(count=Count('article')).order_by()

		print("Articles Published in last 5 hours = ",
			articles_published_in_last_5_hour)
		
		print("Comments per Article in last 5 hours")
		for data in comments_published_per_article:
			print(data)
