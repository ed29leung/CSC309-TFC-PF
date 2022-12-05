from django.core.exceptions import ValidationError
import datetime

from django.db import models as m

from accounts.models import Account
from django.utils.timezone import make_aware


class Class(m.Model):
    studio = m.ForeignKey('studios.Studio', on_delete=m.CASCADE, related_name='tfc_class')
    name = m.CharField(max_length=250)
    description = m.TextField()
    coach = m.CharField(max_length=250)
    class_start = m.DateField()
    class_end = m.DateField()
    class_time = m.TimeField()
    duration = m.DurationField()
    days_inbetween = m.IntegerField()
    spots = m.IntegerField()

    def __str__(self) -> str:
        return self.name

    def clean(self):
        if self.class_start > self.class_end:
            raise ValidationError('Class start date cannot be later than class end date')
        if self.days_inbetween < 0:
            raise ValidationError('Days inbetween cannot be negative')
        if self.spots <= 0:
            raise ValidationError('Spots cannot be zero or negative')
        if self.class_start < datetime.date.today():
            raise ValidationError('Class start date cannot be in the past')
        if self.class_end < datetime.date.today():
            raise ValidationError('Class end date cannot be in the past')
        if self.class_time < datetime.time(0, 0):
            raise ValidationError('Class time cannot be negative')
        if self.class_time > datetime.time(23, 59):
            raise ValidationError('Class time cannot be greater than 23:59')
        if self.duration <= datetime.timedelta(0):
            raise ValidationError('Class duration cannot be negative')
        if self.duration > datetime.timedelta(days=1):
            raise ValidationError('Class duration cannot be greater than 1 day')
        

        return super().clean()
    
    def update(self, *args, **kwargs):
        if 'class_start' in kwargs or 'class_end' in kwargs or 'class_time' in kwargs:
            self.edit_time()

        return super().update(*args, **kwargs)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.set_time()
        return self

    def set_time(self):
        self.duration = self.duration

        if self.days_inbetween == 0:
            # one time class
            ClassTimeTable.objects.create(
                classid=self, 
                time=make_aware(datetime.datetime.combine(self.class_start, self.class_time)),
                spotleft=self.spots
            )
            return

        time_i = datetime.datetime.combine(self.class_start, self.class_time)
        while time_i <= datetime.datetime.combine(self.class_end, self.class_time):
            ClassTimeTable.objects.create(
                classid=self,
                time=make_aware(time_i),
                spotleft=self.spots,
            )
            time_i += datetime.timedelta(days=self.days_inbetween)

        return

    def edit_time(self):
        ClassTimeTable.objects.filter(class_id=self).delete()
        self.set_time()
    
    def delete_one_time(self, time: datetime.datetime):
        if not ClassTimeTable.objects.filter(class_id=self, time=time).exists():
            return False

        ClassTimeTable.objects.filter(class_id=self, time=time).delete()
        return True


class Keywords(m.Model):
    classid = m.ForeignKey('Class', on_delete=m.CASCADE, related_name='keywords')
    keyword = m.CharField(max_length=250)

class ClassTimeTable(m.Model):
    classid = m.ForeignKey('Class', on_delete=m.CASCADE, related_name='timetable')
    time = m.DateTimeField()
    spotleft = m.IntegerField()

    def __str__(self) -> str:
        return f'{self.classid.name} at {self.time}'

    def check_full(self):
        return self.spotleft == 0

    def decrease_spot(self):
        self.spotleft -= 1
        self.save()
        return self.spotleft

    def increase_spot(self):
        self.spotleft += 1
        self.save()
        return self.spotleft



class EnrollClass(m.Model):
    account = m.ForeignKey('accounts.Account', on_delete=m.CASCADE, related_name='enrollclass')
    classtime = m.ForeignKey('classes.ClassTimeTable', on_delete=m.CASCADE, related_name='enrollclass')

    def enroll(self, account: Account, classtime: ClassTimeTable):
        self.account = account
        self.classtime = classtime
        if self.classtime.check_full():
            return False

        classtime.decrease_spot()
        self.save()
        return True

    def drop(self):
        self.classtime.increase_spot()
        self.delete()
        return True

    def check_enroll(account: Account, classtime: ClassTimeTable):
        return EnrollClass.objects.filter(account=account, classtime=classtime).exists()

    def get_user_enroll(account: Account):
        return EnrollClass.objects.filter(account=account)

    def get_class_enroll(classtime: ClassTimeTable):
        return EnrollClass.objects.filter(classtime=classtime)