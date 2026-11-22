import { supabase } from '../../src/lib/supabase';
import type { JobMission, Application } from '../../src/types';
export async function loadMissions(): Promise<JobMission[]> {
 const {data,error}=await supabase.from('missions').select('*').order('created_at',{ascending:false});
 if(error)throw error;
 return (data||[]).filter(m=>m.status!=='draft').map(m=>({id:m.id,employerId:m.employer_id,companyName:m.company_name,companyLogo:'',isCompanyVerified:false,employerRating:0,title:m.title,category:m.category,description:m.description,responsibilities:m.responsibilities||[],requirements:m.requirements||[],requiredSkills:m.required_skills||[],hourlyRate:Number(m.hourly_rate),durationHours:Number(m.duration_hours),totalPayment:Number(m.total_payout),city:m.city,address:m.location_address,date:m.mission_date,startTime:m.start_time.slice(0,5),endTime:m.end_time.slice(0,5),availablePositions:m.spots_total,filledPositions:m.spots_total-m.spots_open,urgency:m.is_urgent?'urgent':'normal',status:m.status,attire:m.attire,mealProvided:m.meal_provided,transportProvided:m.transport_provided,createdAt:m.created_at}));
}
export async function publishMission(j:Omit<JobMission,'id'|'createdAt'|'filledPositions'|'status'>) {
 const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error('Sign in required');
 const minutes=(t:string)=>Number(t.split(':')[0])*60+Number(t.split(':')[1]);
 const hours=(minutes(j.endTime)-minutes(j.startTime))/60;
 if(hours<=0)throw new Error('End time must be after start time');
 const {error}=await supabase.from('missions').insert({employer_id:user.id,company_name:j.companyName,title:j.title,category:j.category,description:j.description,city:j.city,location_address:j.address,mission_date:j.date,start_time:j.startTime,end_time:j.endTime,duration_hours:hours,hourly_rate:j.hourlyRate,total_payout:Math.round(hours*j.hourlyRate*1000)/1000,spots_total:j.availablePositions,spots_open:j.availablePositions,is_urgent:j.urgency==='urgent',required_skills:j.requiredSkills,responsibilities:j.responsibilities,requirements:j.requirements,attire:j.attire,meal_provided:j.mealProvided,transport_provided:j.transportProvided,status:'open'});
 if(error)throw error;
}
export async function loadApplications():Promise<Application[]> {
 const {data,error}=await supabase.from('applications').select('*').order('applied_at',{ascending:false});if(error)throw error;
 return (data||[]).map(a=>({id:a.id,jobId:a.mission_id,studentId:a.student_id,studentName:a.student_name,studentAvatar:'',studentUniversity:'',studentField:'',studentRating:0,coverNote:a.cover_note,cvAttached:a.cv_attached,status:a.status,payoutStatus:a.status==='completed'?'released':a.status==='accepted'?'escrowed':'unpaid',appliedAt:a.applied_at,completedAt:a.checked_out_at,checkInCode:a.mission_pass_code,checkedIn:!!a.checked_in_at}));
}
export async function submitApplication(jobId:string,name:string,note:string,cv:boolean){
 const {data:{user}}=await supabase.auth.getUser();if(!user)throw new Error('Sign in required');
 const {error}=await supabase.from('applications').insert({mission_id:jobId,student_id:user.id,student_name:name,cover_note:note,cv_attached:cv});if(error)throw error;
}

export async function transitionApplication(id:string,action:string){const {error}=await supabase.rpc('transition_application',{p_id:id,p_action:action});if(error)throw error;}
