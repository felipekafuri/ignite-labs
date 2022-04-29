import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursesService } from 'src/services/courses.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Course } from '../models/course';
import { CreateCourseInput } from '../inputs/create-course-input';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { StudentsService } from 'src/services/students.service';
import { EnrollmentsService } from 'src/services/enrollments.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse({ title: data.title });
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error(`Student with id ${user.sub} not found`);
    }

    const enrollments = await this.enrollmentsService.getByCourseAndStudentId({
      studentId: student.id,
      courseId: id,
    });

    if (!enrollments) {
      throw new UnauthorizedException();
    }

    return this.coursesService.getCourseById(id);
  }
}
