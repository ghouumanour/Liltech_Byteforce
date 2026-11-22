import React,{useState} from 'react';
import {View,Text,TextInput,Pressable,ScrollView,StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';

const url=process.env.EXPO_PUBLIC_SUPABASE_URL?.replace(/\/$/,'');
const key=process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
type Session={access_token:string;user:{id:string}};
async function api(path:string,method:string,body?:object,token?:string){
 if(!url||!key||!/^https:\/\/[^/]+$/.test(url))throw new Error('Configure the mobile Supabase URL and publishable key.');
 const result=await fetch(url+path,{method,headers:{apikey:key,'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{})},...(body?{body:JSON.stringify(body)}:{})});
 const raw=await result.text();let data:any;try{data=raw?JSON.parse(raw):null;}catch{throw new Error('Invalid server response.');}
 if(!result.ok)throw new Error(data?.message||data?.msg||'Request failed ('+result.status+').');
 return data;
}
export default function MembershipScreen(){
 const router=useRouter();
 const [email,setEmail]=useState(''),[password,setPassword]=useState('');
 const [session,setSession]=useState<Session|null>(null);
 const [role,setRole]=useState(''),[status,setStatus]=useState('none');
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 async function run(fn:()=>Promise<void>){if(busy)return;setBusy(true);setError('');try{await fn();}catch(e){setError(e instanceof Error?e.message:'Request failed.');}finally{setBusy(false);}}
 async function refresh(s:Session){const id=encodeURIComponent(s.user.id);const profiles=await api('/rest/v1/profiles?select=role&id=eq.'+id,'GET',undefined,s.access_token);setRole(profiles?.[0]?.role||'');const rows=await api('/rest/v1/membership_requests?select=status&user_id=eq.'+id,'GET',undefined,s.access_token);setStatus(rows?.[0]?.status||'none');}
 const button=(label:string,action:()=>void,disabled=false)=><Pressable disabled={disabled} onPress={action} style={[st.button,disabled&&{opacity:.5}]}><Text style={st.buttonText}>{label}</Text></Pressable>;
 return <SafeAreaView style={st.safe}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={st.content}>
 <Pressable onPress={()=>router.back()}><Text style={st.link}>← Back</Text></Pressable>
 <Text style={st.brand}>Get<Text style={{color:'#C73542'}}>Both</Text></Text><Text style={st.title}>Membership</Text><Text style={st.muted}>Grow on your terms.</Text>
 <View style={st.card}><Text style={st.title}>Free · 0 DT</Text><Text style={st.text}>Browse jobs, manage your schedule and apply for free. Core student access stays free.</Text></View>
 <View style={st.pro}><Text style={st.proTitle}>Employer Pro</Text><Text style={st.proText}>Early access · Planned recruiting filters, promoted missions and analytics.</Text><Text style={st.proText}>No payment collected. Pricing and Pro features are not launched.</Text></View>
 <Text style={st.muted}>Use your existing web account to manage membership. Other mobile screens remain a demo.</Text>
 {!session?<>{!url||!key?<Text style={st.error}>Backend configuration required. See mobile/.env.example.</Text>:null}<TextInput style={st.input} autoCapitalize="none" keyboardType="email-address" placeholder="Email" value={email} onChangeText={setEmail}/><TextInput style={st.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>
 {button('Sign in to membership',()=>void run(async()=>{try{const s=await api('/auth/v1/token?grant_type=password','POST',{email:email.trim(),password});setSession(s);await refresh(s);}finally{setPassword('');}}),busy||!url||!key)}</>:<><Text style={st.text}>Account: {email} · {role||'Unknown role'}</Text>
 {role==='employer'?button(status==='none'?'Request Pro access':status==='pending'?'Request pending':status==='approved'?'Interest approved':'Request declined',()=>void run(async()=>{await api('/rest/v1/membership_requests','POST',{user_id:session.user.id},session.access_token);await refresh(session);}),busy||status!=='none'):<Text style={st.muted}>Pro requests are available for employer accounts.</Text>}
 {button('Refresh status',()=>void run(()=>refresh(session)),busy)}
 {button('Sign out of membership',()=>{setSession(null);setStatus('none');setRole('');setPassword('');},busy)}</>}
 {error?<Text accessibilityRole="alert" style={st.error}>{error}</Text>:null}
 </ScrollView></SafeAreaView>;
}
const st=StyleSheet.create({safe:{flex:1,backgroundColor:'#FAFBFD'},content:{padding:22,gap:16,paddingBottom:40},brand:{fontSize:30,fontWeight:'900',color:'#02255E'},title:{fontSize:27,fontWeight:'900',color:'#02255E'},muted:{color:'#64748B',lineHeight:20},text:{color:'#243B5A',lineHeight:22},card:{backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#E2E8F0',padding:20,borderRadius:20,gap:10},pro:{backgroundColor:'#02255E',borderRadius:20,padding:20,gap:10},proTitle:{fontSize:26,fontWeight:'900',color:'#FFFFFF'},proText:{color:'#D7E4F4',lineHeight:22},link:{color:'#235BB2',fontWeight:'700'},input:{backgroundColor:'#FFFFFF',padding:15,borderRadius:14,borderWidth:1,borderColor:'#DCE4EE',color:'#243B5A'},button:{backgroundColor:'#02255E',padding:16,borderRadius:14,alignItems:'center'},buttonText:{color:'#FFFFFF',fontWeight:'800'},error:{color:'#C73542',lineHeight:20}});
